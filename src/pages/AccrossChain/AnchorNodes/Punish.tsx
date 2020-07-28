import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, message, Input } from 'antd';
import React, { useState, useRef, Fragment, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { queryPunish, addPunish, queryNode, queryWallet, queryRule } from './service';
import FormItem from '../components/FormItem';
import { PunishListItem, FormPropsType, NodeListItem, AddFee, AnchorNodeItem } from './data';
import CreateForm from './components/CreateForm';

const Punish = () => {
  const actionRef = useRef<ActionType>();
  const [punishModalVisible, handlePunishModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;
  const [pageCount, setPageCount] = useState(0);
  const [currentNode, setCurrentNode] = useState<NodeListItem | undefined>(undefined);
  const [anchorEnum, setAnchorEnum] = useState({});
  const [isDisplay, setDisplay] = useState(false);
  const [publicList, setPublicList] = useState<any>({
    nodeList: [],
    anchorNodeList: [],
    wallestList: [],
  });

  const onReset = () => {
    resetFields();
    setDisplay(false);
  };

  const addHandle = async (params: AddFee) => {
    const res = await addPunish(params);
    if (res.code === 0) {
      message.success('添加成功');
    }
    //  else {
    //   message.error(res.msg || '添加失败');
    // }
    setCurrentNode(undefined);
    handlePunishModalVisible(false);
    actionRef.current?.reload();
  };

  const submitHandle = () => {
    validateFields()
      .then((values) => {
        console.log({ ...values, coin: currentNode?.coin_name || '' });
        addHandle({ ...values, coin: currentNode?.coin_name || '' } as AddFee);
      })
      .catch((errorInfo) => {
        console.log('校验出错~', errorInfo);
      });
  };

  const getOptionList = async () => {
    const nodeRes = await queryNode();
    const walletRes = await queryWallet();
    const anchorRes = await queryRule();
    setPublicList({
      nodeList: nodeRes.data || [],
      wallestList: walletRes.data || [],
      anchorNodeList: anchorRes.data.page_data.map((item: AnchorNodeItem) => ({
        ...item,
        name: item.anchor_node_name,
      })),
    });
    const enumMap = {};
    anchorRes.data.page_data.map((item: AnchorNodeItem) => {
      enumMap[item.ID] = item.anchor_node_name;
      return false;
    });
    setAnchorEnum(enumMap);
  };
  useEffect(() => {
    getOptionList();
  }, []);

  const fourthColumns: ProColumns<PunishListItem>[] = [
    {
      title: '时间',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '锚定节点名称',
      dataIndex: 'anchor_node_name',
      key: 'anchor_node_name',
      hideInSearch: true,
    },
    {
      title: '锚定节点',
      dataIndex: 'anchor_node_id',
      key: 'anchor_node_id',
      hideInTable: true,
      valueEnum: anchorEnum,
    },
    {
      title: '管理类型',
      dataIndex: 'manage_type',
      key: 'manage_type',
      hideInSearch: true,
    },
    {
      title: '数值',
      dataIndex: ['value', 'coin'],
      key: 'value',
      hideInSearch: true,
      render: (_, record) => {
        return <span>{`${record.value}${record.coin}`}</span>;
      },
    },
  ];

  const children = (
    <Fragment>
      <p style={{ marginTop: '2rem', marginBottom: '2rem' }}>token类型：{currentNode?.coin_name}</p>
      <Form.Item
        label="扣减数量"
        name="value"
        rules={[{ required: true, message: '请输入扣减数量' }]}
      >
        <Input />
      </Form.Item>
    </Fragment>
  );

  const changeDisplay = (value: any) => {
    if (value === 'token') {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  const changeNode = (value: number) => {
    setCurrentNode(publicList.nodeList.filter((item: NodeListItem) => item.ID === value)[0]);
  };

  const fiftyFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'node_id',
      isSelect: true,
      handle: changeNode,
      needChange: true,
      dataSource: publicList.nodeList,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择锚定节点',
      fieldName: 'anchor_node_id',
      isSelect: true,
      dataSource: publicList.anchorNodeList,
    },
    {
      formItemYype: 'select',
      formItemLabel: '管理类型',
      fieldName: 'manage_type',
      isSelect: true,
      needChange: true,
      handle: changeDisplay,
      dataSource: [
        {
          ID: 'token',
          name: '扣减质押Token',
        },
        {
          ID: 'suspend',
          name: '暂停签名资格',
        },
        {
          ID: 'recovery',
          name: '恢复签名资格',
        },
      ],
      children: isDisplay && children,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择账户',
      fieldName: 'wallet_id',
      isSelect: true,
      dataSource: publicList.wallestList,
    },
    {
      formItemYype: 'password',
      formItemLabel: '钱包密码',
      fieldName: 'password',
      isSelect: false,
      dataSource: [],
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<PunishListItem>
        headerTitle="惩罚管理列表"
        actionRef={actionRef}
        rowKey="key"
        options={false}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              onReset();
              handlePunishModalVisible(true);
            }}
          >
            <PlusOutlined /> 管理锚定节点
          </Button>,
        ]}
        request={(params: any) =>
          queryPunish({
            page_size: params.pageSize || 10,
            current_page: params.current || 1,
            anchor_node_id: params.anchor_node_id,
          })
        }
        postData={(data: any) => {
          setPageCount(data.total_count);
          return data.page_data;
        }}
        pagination={{ total: pageCount, defaultPageSize: 10 }}
        columns={fourthColumns}
      />
      <CreateForm
        onCancel={() => {
          setDisplay(false);
          handlePunishModalVisible(false);
        }}
        onReset={onReset}
        onClick={submitHandle}
        modalVisible={punishModalVisible}
        modalTitle="管理锚定节点"
      >
        <FormItem form={form} formPropsList={fiftyFormPropsList} />
      </CreateForm>
    </PageHeaderWrapper>
  );
};

export default Punish;
