import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Divider, Form, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { history } from 'umi';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { queryRule, queryChain, queryWallet, addRule, getNodeByChain, removeRule } from './service';
import FormItem from '../components/FormItem';
import { TableListItem, FormPropsType, WalletListItem, ChainListItem, NodeListItem } from './data';
import CreateForm from './components/CreateForm';

const AnchorNodes = () => {
  const actionRef = useRef<ActionType>();
  const [pageCount] = useState(0);
  const [deleteModalVisible, handleDeleteModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;
  const [wallestList, setWalletList] = useState<WalletListItem[]>([]);
  const [chainList, setChainList] = useState<ChainListItem[]>([]);
  const [sourceNodeList, setSourceNodeList] = useState<NodeListItem[]>([]);
  const [targetNodeList, setTargetNodeList] = useState<NodeListItem[]>([]);
  const [anchorNodeList, setAnchorNodeList] = useState({});

  const getOptionList = async () => {
    const chainRes = await queryChain();
    const res = await queryRule();
    const walletRes = await queryWallet();
    setChainList(chainRes.data.page_data || []);
    setAnchorNodeList(
      res.data.page_data.map((item: TableListItem) => ({
        text: item.anchor_node_name,
        value: item.ID,
      })),
    );
    setWalletList(walletRes.data || []);
  };
  useEffect(() => {
    getOptionList();
  }, []);

  const onReset = () => {
    resetFields();
  };

  const addHandle = async (params: TableListItem) => {
    const res = await addRule(params);
    if (res.code === 0) {
      message.success('添加成功');
    } else {
      message.error(res.msg || '添加失败');
    }
  };

  const submitHandle = () => {
    validateFields()
      .then((values) => {
        addHandle(values as TableListItem);
      })
      .catch((errorInfo) => {
        console.log('校验出错~', errorInfo);
      });
  };

  const deleteModal = async () => {
    handleDeleteModalVisible(true);
  };

  const deleteHandle = () => {
    validateFields()
      .then(async (values) => {
        console.log('删除锚定节点');
        const res = await removeRule(values as TableListItem);
        if (res.code === 0) {
          message.success('删除成功');
        } else {
          message.error(res.msg || '删除失败');
        }
      })
      .catch((errorInfo) => {
        console.log('校验出错~', errorInfo);
      });
  };

  const changeNodeList = async (ID: number, type: string) => {
    const res = await getNodeByChain({ chain_id: ID });
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
      fieldName: '',
      isSelect: false,
      dataSource: [],
      isTips: true,
      extra: '删除后，将从区块链上移除该锚定节点的签名资格，请再次确定是否要删除锚定节点。',
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择链A节点',
      fieldName: 'source_node_id ',
      isSelect: true,
      dataSource: sourceNodeList,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择链B节点',
      fieldName: 'target_node_id ',
      isSelect: true,
      dataSource: targetNodeList,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择账户',
      fieldName: 'wallet_id ',
      isSelect: true,
      dataSource: wallestList,
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
      dataSource: chainList,
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
      formItemYype: 'select',
      formItemLabel: '链B',
      fieldName: 'target_chain_id',
      isSelect: true,
      dataSource: chainList,
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
      dataSource: wallestList,
    },
    {
      formItemYype: 'password',
      formItemLabel: '钱包密码',
      fieldName: 'password',
      isSelect: false,
      dataSource: [],
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
      valueType: 'date',
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
      dataIndex: 'createdAt',
      key: 'createdAt',
      hideInTable: true,
      valueEnum: anchorNodeList,
    },
    {
      title: '归属链A',
      dataIndex: 'chain_a',
      key: 'chain_a',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '归属链B',
      dataIndex: 'chain_b',
      key: 'chain_b',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '质押金额',
      dataIndex: 'pledge',
      key: 'pledge',
      hideInSearch: true,
      hideInForm: true,
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
              history.push(`/accrossChain/anchor-nodes/details/${record.ID}`);
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          <a onClick={deleteModal}>删除</a>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        headerTitle="锚定节点列表"
        actionRef={actionRef}
        rowKey="created_at"
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
        request={(params) => {
          return queryRule({
            page_size: params.pageSize || 10,
            current_page: params.current || 1,
            // filter,
          });
        }}
        postData={(data: any) => data.page_data}
        columns={firstColumns}
        pagination={{
          total: pageCount,
          defaultPageSize: 10,
        }}
      />
      <CreateForm
        onCancel={() => handleDeleteModalVisible(false)}
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
