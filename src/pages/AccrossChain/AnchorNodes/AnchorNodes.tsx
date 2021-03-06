import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Divider, Form, message } from 'antd';
import React, { useState, useRef } from 'react';
import { history } from 'umi';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { addRule, getNodeByChain, removeRule, queryRule, updateAnchor } from './service';
import FormItem from '../components/FormItem';
import { TableListItem, FormPropsType, NodeListItem } from './data';
import CreateForm from './components/CreateForm';

const Web3Utils = require('web3-utils');
const BigNumber = require('bignumber.js');

interface PropsType {
  publicList: any;
}

const AnchorNodes = (props: PropsType) => {
  const actionRef = useRef<ActionType>();
  const [pageCount, setPageCount] = useState(0);
  const [deleteModalVisible, handleDeleteModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateVisible] = useState<boolean>(false);
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;
  const [sourceNodeList, setSourceNodeList] = useState<NodeListItem[]>([]);
  const [targetNodeList, setTargetNodeList] = useState<NodeListItem[]>([]);
  const [nodeList, setNodeList] = useState({ sourceNode: [], targetNode: [] });
  const [currentAnchor, setCurrentAnchor] = useState<TableListItem | null>(null);

  const onReset = () => {
    resetFields();
  };

  const addHandle = async (params: TableListItem) => {
    const res = await addRule(params);
    if (res.code === 0) {
      message.success('添加成功');
      handleModalVisible(false);
      actionRef.current?.reload();
    }
  };

  const updateHandle = async (params: TableListItem) => {
    const res = await updateAnchor(params);
    if (res.code === 0) {
      message.success('编辑成功');
      setCurrentAnchor(null);
      handleUpdateVisible(false);
      actionRef.current?.reload();
    }
  };

  const submitHandle = () => {
    validateFields()
      .then((values: any) => {
        if (currentAnchor?.id) {
          updateHandle({ ...values, id: currentAnchor?.id });
        } else {
          addHandle(values as TableListItem);
        }
      })
      .catch((errorInfo) => {
        console.log('校验出错~', errorInfo);
      });
  };

  const deleteModal = async (record: TableListItem) => {
    const sourceRes = await getNodeByChain({ chain_id: record.chain_a_id });
    const targetRes = await getNodeByChain({ chain_id: record.chain_b_id });
    setNodeList({ sourceNode: sourceRes.data, targetNode: targetRes.data });
    onReset();
    handleDeleteModalVisible(true);
  };

  const deleteHandle = () => {
    validateFields()
      .then(async (values: any) => {
        const res = await removeRule({ ...values, anchor_node_id: currentAnchor?.id });
        if (res.code === 0) {
          message.success('删除成功');
          actionRef.current?.reload(true);
          setCurrentAnchor(null);
          handleDeleteModalVisible(false);
        }
      })
      .catch((errorInfo) => {
        console.log('校验出错~', errorInfo);
      });
  };

  const changeNodeList = async (id: number, type: string) => {
    const res = await getNodeByChain({ chain_id: id });
    if (type === 'source') {
      setSourceNodeList(res.data);
    } else {
      setTargetNodeList(res.data);
    }
  };

  const sourceHandle = async (value: number) => {
    changeNodeList(value, 'source');
  };

  const targetHandle = async (value: number) => {
    changeNodeList(value, 'target');
  };

  const deleteFormPropsList: FormPropsType[] = [
    {
      formItemYype: '',
      formItemLabel: '',
      fieldName: 'word_tip',
      isSelect: false,
      dataSource: [],
      extra: '删除后，将从区块链上移除该锚定节点的签名资格，请再次确定是否要删除锚定节点。',
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择链A节点',
      fieldName: 'source_node_id',
      isSelect: true,
      dataSource: nodeList.sourceNode,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择链B节点',
      fieldName: 'target_node_id',
      isSelect: true,
      dataSource: nodeList.targetNode,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择账户',
      fieldName: 'wallet_id',
      isSelect: true,
      dataSource: props.publicList.wallestList,
    },
    {
      formItemYype: 'password',
      formItemLabel: '钱包密码',
      fieldName: 'password',
      isSelect: false,
      dataSource: [],
    },
  ];

  const formPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '链A',
      fieldName: 'source_chain_id',
      isSelect: true,
      dataSource: props.publicList.chainList,
      handle: sourceHandle,
      needChange: true,
    },
    {
      formItemYype: 'select',
      formItemLabel: '链A的节点',
      fieldName: 'source_node_id',
      isSelect: true,
      dataSource: sourceNodeList,
    },
    {
      formItemYype: 'text',
      formItemLabel: 'A链rpcURL',
      fieldName: 'source_rpc_url',
      isSelect: false,
      dataSource: [],
      children: <Divider />,
      rules: {
        pattern: new RegExp(/https?:\/\//g),
        message: '只允许输入以http://或https://开头的字符',
      },
      // rules: () => ({
      //   validator(_, value) {
      //     const pattern = new RegExp(/https?:\/\//g);
      //     console.log(value);
      //     console.log(pattern.test(value));
      //     if (pattern.test(value)) {
      //       return Promise.resolve();
      //     }
      //     return Promise.reject(new Error('只允许输入以http://或https://开头的字符'));
      //   },
      // }),
    },
    {
      formItemYype: 'select',
      formItemLabel: '链B',
      fieldName: 'target_chain_id',
      isSelect: true,
      dataSource: props.publicList.chainList,

      handle: targetHandle,
      needChange: true,
    },
    {
      formItemYype: 'select',
      formItemLabel: '链B的节点',
      fieldName: 'target_node_id',
      isSelect: true,
      dataSource: targetNodeList,
    },
    {
      formItemYype: 'text',
      formItemLabel: 'B链rpcURL',
      fieldName: 'target_rpc_url',
      isSelect: false,
      dataSource: [],
      children: <Divider />,
      rules: {
        pattern: new RegExp(/https?:\/\//g),
        message: '只允许输入以http://或https://开头的字符',
      },
    },
    {
      formItemYype: 'text',
      formItemLabel: '锚定节点名称',
      fieldName: 'anchor_name',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '锚定节点地址',
      fieldName: 'anchor_address',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择钱包账户',
      fieldName: 'wallet_id',
      isSelect: false,
      dataSource: props.publicList.wallestList,
    },
    {
      formItemYype: 'password',
      formItemLabel: '钱包密码',
      fieldName: 'password',
      isSelect: false,
      dataSource: [],
    },
  ];

  const updateFormPropsList: FormPropsType[] = [
    {
      children: <p>锚定节点名称：{currentAnchor?.anchor_node_name}</p>,
      renderInBefore: true,
    },
    {
      formItemYype: 'text',
      formItemLabel: 'A链rpcURL',
      fieldName: 'source_rpc_url',
      isSelect: false,
      dataSource: [],
      // rules: {
      //   pattern: new RegExp('/(http://|https://)://([w.]+/?)S*/'),
      //   message: '只允许输入以http://或https://开头的字符',
      // },
      // rules: ({ getFieldValue }) => ({
      //   validator(_, value) {
      //     if (!value || getFieldValue('new_password') === value) {
      //       return Promise.resolve();
      //     }
      //     return Promise.reject(new Error('两次密码输入不一致!'));
      //   },
      // }),
    },
    {
      formItemYype: 'text',
      formItemLabel: 'B链rpcURL',
      fieldName: 'target_rpc_url',
      isSelect: false,
      dataSource: [],
      children: <Divider />,
      // rules: {
      //   pattern: new RegExp('/(http://|https://)://([w.]+/?)S*/'),
      //   message: '只允许输入以http://或https://开头的字符',
      // },
    },
  ];

  const detailFormPropsList: FormPropsType[] = [
    {
      formItemYype: '',
      formItemLabel: '链A',
      fieldName: 'chain_a',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '链A的节点',
      fieldName: 'chain_a_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '链B',
      fieldName: 'chain_b',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '链B的节点',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '锚定节点名称',
      fieldName: 'name',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '锚定节点地址',
      fieldName: 'address',
      isSelect: false,
      dataSource: [],
    },
  ];

  const firstColumns: ProColumns<TableListItem>[] = [
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '锚定节点名称',
      dataIndex: 'anchor_node_name',
      key: 'anchor_node_name',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '锚定节点',
      dataIndex: 'anchor_node_id',
      key: 'anchor_node_id',
      hideInTable: true,
      valueEnum: props.publicList.anchorEnum,
    },
    {
      title: '归属链A',
      dataIndex: 'chain_a',
      key: 'chain_a',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '链A rpcURL',
      dataIndex: 'source_rpc_url',
      key: 'source_rpc_url',
      hideInSearch: true,
      hideInForm: true,
      ellipsis: true,
      render: (text) => (
        <div
          style={{
            maxWidth: '180px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: '归属链B',
      dataIndex: 'chain_b',
      key: 'chain_b',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '链B rpcURL',
      dataIndex: 'target_rpc_url',
      key: 'target_rpc_url',
      hideInSearch: true,
      hideInForm: true,
      ellipsis: true,
      render: (text) => (
        <div
          style={{
            maxWidth: '180px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: '质押金额',
      dataIndex: 'pledge',
      key: 'pledge',
      hideInSearch: true,
      hideInForm: true,
      renderText: (text) => `${Web3Utils.fromWei(new BigNumber(text || 0).toFixed())}`,
    },
    {
      title: '身份状态',
      dataIndex: 'status',
      key: 'status',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              history.push(`/accrossChain/anchor-nodes/details/${record.id}`);
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateVisible(true);
              setCurrentAnchor(record);
              form.setFieldsValue(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setCurrentAnchor(record);
              deleteModal(record);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        headerTitle="锚定节点列表"
        actionRef={actionRef}
        // rowKey={`${Math.random()}`}
        rowKey="id"
        options={false}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              onReset();
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={(params: any) =>
          queryRule({
            page_size: params.pageSize || 10,
            current_page: params.current || 1,
            anchor_node_id: params.anchor_node_id,
          })
        }
        postData={(data: any) => {
          console.log('data-----555', data.page_data);
          setPageCount(data.total_count);
          return data.page_data;
        }}
        columns={firstColumns}
        pagination={{
          total: pageCount,
          defaultPageSize: 10,
        }}
      />
      <CreateForm
        onCancel={() => {
          setCurrentAnchor(null);
          handleDeleteModalVisible(false);
        }}
        onReset={onReset}
        onClick={deleteHandle}
        modalVisible={deleteModalVisible}
        modalTitle="删除锚定节点"
      >
        <FormItem form={form} formPropsList={deleteFormPropsList} />
      </CreateForm>
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        onReset={onReset}
        onClick={submitHandle}
        modalVisible={createModalVisible}
        modalTitle="新增锚定节点"
      >
        <FormItem form={form} formPropsList={formPropsList} />
      </CreateForm>
      <CreateForm
        onCancel={() => handleUpdateVisible(false)}
        onReset={onReset}
        onClick={submitHandle}
        modalVisible={updateModalVisible}
        modalTitle="编辑锚定节点"
      >
        <FormItem form={form} formPropsList={updateFormPropsList} />
      </CreateForm>
      <Drawer
        title="查看锚定节点"
        width={450}
        onClose={() => handleDrawerVisible(false)}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => handleDrawerVisible(false)} style={{ marginRight: 8 }}>
              确定
            </Button>
          </div>
        }
      >
        <FormItem form={form} formPropsList={detailFormPropsList} />
      </Drawer>
    </>
  );
};

export default AnchorNodes;
