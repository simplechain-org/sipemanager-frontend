import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Select } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import { TableListItem, ChainListItem, WalletListItem } from './data';
import { addRule, queryChain, queryWallet, queryRule, updateRule } from './service';

const AccrossConfig: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [pageCount, setPageCount] = useState(0);
  const [chainList, setChainList] = useState([]);
  const [walletList, setWalletList] = useState([]);
  const [currentSource, setCurrentSource] = useState<ChainListItem | undefined>(undefined);
  const [currentTarget, setCurrentTarget] = useState<ChainListItem | undefined>(undefined);
  const [currentConfigItem, setCurrentConfigItem] = useState<any>(null);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '发起链',
      dataIndex: 'source_chain_name',
      key: 'source_chain_name',
      hideInForm: true,
    },
    {
      title: '目标链',
      dataIndex: 'target_chain_name',
      key: 'target_chain_name',
      hideInForm: true,
    },
    {
      title: '链A跨链手续费',
      dataIndex: 'source_chain_coin',
      key: 'source_chain_coin',
      hideInForm: true,
    },
    {
      title: '链B跨链手续费',
      dataIndex: 'target_chain_coin',
      key: 'target_chain_coin',
      hideInForm: true,
    },
    {
      title: '链A',
      dataIndex: 'source_chain_id',
      key: 'source_chain_id',
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请选择链A',
        },
      ],
      renderFormItem: (_, config) => {
        setCurrentSource(chainList.find((item: ChainListItem) => item.ID === config.value));
        return (
          <Select onChange={config.onChange} value={config.value}>
            {chainList.map((item: ChainListItem) => (
              <Select.Option value={item.ID} key={item.ID}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        );
      },
      // initialValue: currentConfigItem?.source_chain_id,
    },
    {
      title: '链B',
      dataIndex: 'target_chain_id',
      key: 'target_chain_id',
      hideInTable: true,
      renderFormItem: (_, config) => {
        setCurrentTarget(chainList.find((item: ChainListItem) => item.ID === config.value));
        return (
          <Select onChange={config.onChange} value={config.value}>
            {chainList.map((item: ChainListItem) => (
              <Select.Option value={item.ID} key={item.ID}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        );
      },
      rules: [
        {
          required: true,
          message: '请选择链B',
        },
      ],
      // initialValue: currentConfigItem?.target_chain_id,
    },
    {
      title: '链A跨链手续费',
      dataIndex: 'source_reward',
      key: 'source_reward',
      renderFormItem: (_, config) => (
        <Input
          suffix={currentSource?.coin_name || ''}
          value={config.value}
          onChange={config.onChange}
        />
      ),
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请输入链A跨链手续费',
        },
      ],
      // initialValue: currentConfigItem?.source_reward,
    },
    {
      title: '链B跨链手续费',
      dataIndex: 'target_reward',
      key: 'target_reward',
      renderFormItem: (_, config) => (
        <Input
          suffix={currentTarget?.coin_name || ''}
          //   value和onChange不写则表单校验时读取不到该表单项的值，校验无法通过
          value={config.value}
          onChange={config.onChange}
        />
      ),
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请输入链B跨链手续费',
        },
      ],
      // initialValue: currentConfigItem?.target_reward,
    },
    {
      title: '选择钱包账户',
      dataIndex: 'wallet_id',
      key: 'wallet_id',
      valueEnum: { ...walletList },
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请选择钱包账户',
        },
      ],
      // initialValue: currentConfigItem?.wallet_id,
    },
    {
      title: '钱包密码',
      dataIndex: 'password',
      key: 'password',
      renderFormItem: (_, config) => (
        <Input.Password value={config.value} onChange={config.onChange} />
      ),
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请输入钱包密码',
        },
      ],
      // initialValue: currentConfigItem?.password,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <a
          onClick={() => {
            handleModalVisible(true);
            setCurrentConfigItem(record);
            // form.setFieldsValue(record);
            // form.setFieldsValue({ password: 'qqqqqqqqqq' });
          }}
        >
          编辑
        </a>
      ),
      hideInForm: true,
    },
  ];

  const getChainList = async () => {
    const res = await queryChain();
    const walletRes = await queryWallet();
    setChainList(
      res.data.page_data.map((item: ChainListItem) => ({
        text: item.name,
        value: item.ID,
        ...item,
      })),
    );
    setWalletList(walletRes.data.map((item: WalletListItem) => ({ ...item, text: item.name })));
  };

  useEffect(() => {
    getChainList();
  }, []);

  const handleAdd = async (fields: any) => {
    try {
      let res;
      if (currentConfigItem) {
        res = await updateRule(fields);
      } else {
        res = await addRule({ ...fields, wallet_id: parseInt(fields.wallet_id, 10) });
      }
      if (res.code === 0) {
        message.success('操作成功');
        actionRef.current?.reload();
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="跨链配置列表"
        actionRef={actionRef}
        rowKey="ID"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        options={false}
        request={(params: any) =>
          queryRule({
            current_page: params.current,
            page_size: params.pageSize,
          })
        }
        // dataSource={[
        //   {
        //     source_chain_name: 'hhhhh',
        //     source_chain_id: 1,
        //     target_chain_id: 3,
        //     wallet_id: 18,
        //     password: 'qiqiqi',
        //   },
        // ]}
        postData={(data: any) => {
          setPageCount(data.total_count);
          return data.page_data;
        }}
        search={false}
        pagination={{
          total: pageCount,
          defaultPageSize: 10,
        }}
        columns={columns}
      />
      <CreateForm
        onCancel={() => {
          handleModalVisible(false);
          setCurrentConfigItem(null);
        }}
        modalVisible={createModalVisible}
      >
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
          //   form={form}
          // form={{
          //   initialValues: {
          //     source_chain_id: 2,
          //     target_chain_id: 1,
          //     wallet_id: 18,
          //     source_reward: 0.2,
          //     target_reward: 0.5,
          //     password: 'ppppppppp',
          //   },
          // }}
          form={{
            initialValues: currentConfigItem,
          }}
          //   formRef={form}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
    </PageHeaderWrapper>
  );
};

export default AccrossConfig;
