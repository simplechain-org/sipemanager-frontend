import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Space, Form } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

// import { getRandomIP } from '@/utils/utils';
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
  const [pageCount, setPageCount] = useState(0);

  const getOptionList = async () => {
    const chainRes = await queryChain();
    const res = await queryNode();
    const walletRes = await queryWallet();
    const contractRes = await queryContract();
    setChainList({
      ...(chainRes.data.page_data || []).map((item: ChainListItem) => ({
        text: item.name,
        value: item.id,
      })),
    });
    setNodeList(res.data.map((item: NodeListItem) => ({ label: item.name, value: item.id })));
    setWalletList(
      walletRes.data.map((item: WalletListItem) => ({ label: item.name, value: item.id })),
    );
    setContractList(
      contractRes.data.page_data.map((item: ContractListItem) => ({
        label: item.name,
        value: item.id,
      })),
    );
  };

  useEffect(() => {
    getOptionList();
  }, []);

  const deployContract = async (params: TableListItem) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addInstance(params);
      hide();
      if (res.code === 0) {
        message.success('添加成功');
        handleUploadModalVisible(false);
        actionRef.current?.reload();
      }
      return true;
    } catch (error) {
      hide();
      handleUploadModalVisible(false);
      actionRef.current?.reload();
      return false;
    }
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
      dataIndex: 'created_at',
      key: 'created_at',
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
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '请输入合约名称',
        },
      ],
    },
    {
      title: '链的名称',
      dataIndex: 'chain_name',
      key: 'chain_name',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '合约地址',
      dataIndex: 'address',
      key: 'address',
      hideInSearch: true,
      // initialValue: getRandomIP(),
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
      ellipsis: true,
      rules: [
        {
          required: true,
          message: '请输入交易哈希',
        },
      ],
    },
    {
      title: '合约abi',
      dataIndex: 'abi',
      key: 'abi',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'textarea',
      rules: [
        {
          required: true,
          message: '请输入合约abi',
        },
      ],
    },
    {
      title: '合约bin',
      dataIndex: 'bin',
      key: 'bin',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'textarea',
      rules: [
        {
          required: true,
          message: '请输入合约bin',
        },
      ],
    },
    {
      title: '合约源码',
      dataIndex: 'sol',
      key: 'sol',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'textarea',
      rules: [
        {
          required: true,
          message: '请输入合约源码',
        },
      ],
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
        search={false}
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
              <PlusOutlined /> 本地合约上链
            </Button>
          </Space>,
        ]}
        options={false}
        request={(params) =>
          queryRule({
            page_size: params.pageSize || 10,
            current_page: params.current || 1,
            // status: '',
          })
        }
        postData={(data: any) => {
          setPageCount(data.total_count);
          return data.page_data;
        }}
        pagination={{
          total: pageCount,
          defaultPageSize: 10,
        }}
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
