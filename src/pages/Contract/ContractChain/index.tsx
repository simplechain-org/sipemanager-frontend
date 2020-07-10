import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Space, Form } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UploadForm from './components/UploadForm';
import FormItem from '../components/FormItem';
import {
  TableListItem,
  NodeListItem,
  ContractListItem,
  WalletListItem,
  ChainListItem,
} from './data';
import {
  queryRule,
  addRule,
  queryChain,
  queryNode,
  queryWallet,
  queryContract,
  addInstance,
} from './service';

const ContractChain: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [uploadModalVisible, handleUploadModalVisible] = useState<boolean>(false);
  const [chainList, setChainList] = useState({});
  const [nodeList, setNodeList] = useState<NodeListItem[] | []>([]);
  const [walletList, setWalletList] = useState<WalletListItem[] | []>([]);
  const [contractList, setContractList] = useState<ContractListItem[] | []>([]);
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const getOptionList = async () => {
    const chainRes = await queryChain();
    const res = await queryNode();
    const walletRes = await queryWallet();
    const contractRes = await queryContract();
    setChainList({
      ...chainRes.data.map((item: ChainListItem) => ({ text: item.name, value: item.ID })),
    });
    setNodeList(res.data.map((item: NodeListItem) => ({ label: item.name, value: item.ID })));
    setWalletList(
      walletRes.data.map((item: WalletListItem) => ({ label: item.name, value: item.ID })),
    );
    setContractList(
      contractRes.data.map((item: ContractListItem) => ({
        label: item.description,
        value: item.ID,
      })),
    );
  };

  useEffect(() => {
    getOptionList();
  }, []);

  const deployContract = async (params: TableListItem) => {
    await addInstance(params);
    handleUploadModalVisible(false);
    actionRef.current?.reload();
  };

  const submitHandle = () => {
    form
      .validateFields()
      .then((values) => {
        deployContract(values as TableListItem);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const handleAdd = async (params: TableListItem) => {
    const hide = message.loading('正在添加');
    try {
      await addRule({ ...params });
      hide();
      message.success('添加成功');
      handleUploadModalVisible(false);
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      handleUploadModalVisible(false);
      return false;
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '创建时间',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '所在链',
      dataIndex: 'chain_id',
      key: 'chain_id',
      hideInSearch: true,
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请选择所在链',
        },
      ],
      valueEnum: chainList || {},
    },
    {
      title: '合约名称',
      dataIndex: 'description',
      key: 'description',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '请输入合约名称',
        },
      ],
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      hideInForm: true,
      valueEnum: {},
    },
    {
      title: '链的名称',
      dataIndex: 'chain_id',
      key: 'chain_id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '合约地址',
      dataIndex: 'address',
      key: 'address',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '请输入合约地址',
        },
      ],
    },
    {
      title: '交易哈希',
      dataIndex: 'tx_hash',
      key: 'tx_hash',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '请输入交易哈希',
        },
      ],
    },
    {
      title: '合约abi(选填)',
      dataIndex: 'abi',
      key: 'abi',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'textarea',
    },
    {
      title: '合约bin(选填)',
      dataIndex: 'bin',
      key: 'bin',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'textarea',
    },
    {
      title: '合约源码(选填)',
      dataIndex: 'sol',
      key: 'sol',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'textarea',
    },
  ];

  const formPropsList = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'node_id',
      isRequire: true,
      isSelect: true,
      dataSource: nodeList || [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择合约',
      fieldName: 'contract_id',
      isRequire: true,
      isSelect: true,
      dataSource: contractList || [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择钱包',
      fieldName: 'wallet_id',
      isRequire: true,
      isSelect: true,
      dataSource: walletList || [],
    },
    {
      formItemYype: 'password',
      formItemLabel: '钱包密码',
      fieldName: 'password',
      isRequire: true,
      isSelect: false,
      dataSource: [],
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="合约上链列表"
        actionRef={actionRef}
        rowKey="tx_hash"
        toolBarRender={() => [
          <Space>
            <Button type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> 引用链上合约
            </Button>
            <Button
              type="primary"
              onClick={() => {
                form.resetFields();
                handleUploadModalVisible(true);
              }}
            >
              <PlusOutlined /> 上传本地合约
            </Button>
          </Space>,
        ]}
        options={false}
        request={(params) => queryRule({ ...params })}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      <UploadForm
        onCancel={() => handleUploadModalVisible(false)}
        modalVisible={uploadModalVisible}
        onReset={() => form.resetFields()}
        submitHandle={submitHandle}
      >
        <FormItem formPropsList={formPropsList} form={form} />
      </UploadForm>
    </PageHeaderWrapper>
  );
};

export default ContractChain;
