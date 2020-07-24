import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Select } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import { TableListItem, ChainListItem, WalletListItem } from './data';
import { addRule, queryChain, queryWallet } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: any) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addRule({ ...fields, network_id: parseInt(fields.network_id, 10) });
    hide();
    if (res.code === 0) {
      message.success('添加成功');
    } else {
      message.error(res.msg || '添加失败');
    }
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const AccrossConfig: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [pageCount] = useState(0);
  //   const [pageCount, setPageCount] = useState(0);
  const [chainList, setChainList] = useState([]);
  const [walletList, setWalletList] = useState([]);
  const [currentSource, setCurrentSource] = useState<ChainListItem | undefined>(undefined);
  const [currentTarget, setCurrentTarget] = useState<ChainListItem | undefined>(undefined);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '发起链',
      dataIndex: 'source_chain',
      key: 'source_chain',
      hideInForm: true,
    },
    {
      title: '目标链',
      dataIndex: 'target_chain',
      key: 'target_chain',
      hideInForm: true,
    },
    {
      title: '链A跨链手续费',
      dataIndex: 'chain_a_fee',
      key: 'chain_a_fee',
      hideInForm: true,
    },
    {
      title: '链B跨链手续费',
      dataIndex: 'chain_b_fee',
      key: 'chain_b_fee',
      hideInForm: true,
    },
    {
      title: '链A',
      dataIndex: 'chain_a',
      key: 'chain_a',
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
          <Select onChange={config.onChange}>
            {chainList.map((item: ChainListItem) => (
              <Select.Option value={item.ID} key={item.ID}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: '链B',
      dataIndex: 'chain_b',
      key: 'chain_b',
      hideInTable: true,
      renderFormItem: (_, config) => {
        setCurrentTarget(chainList.find((item: ChainListItem) => item.ID === config.value));
        return (
          <Select onChange={config.onChange}>
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
    },
    {
      title: '链A跨链手续费',
      dataIndex: 'chain_a_fee',
      key: 'chain_a_fee',
      renderFormItem: () => <Input suffix={currentSource?.coin_name || ''} />,
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请输入链A跨链手续费',
        },
      ],
    },
    {
      title: '链B跨链手续费',
      dataIndex: 'chain_b_fee',
      key: 'chain_b_fee',
      renderFormItem: () => <Input suffix={currentTarget?.coin_name || ''} />,
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请输入链B跨链手续费',
        },
      ],
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
    },
    {
      title: '钱包密码',
      dataIndex: 'password',
      key: 'password',
      renderFormItem: () => <Input.Password />,
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请输入钱包密码',
        },
      ],
    },
    {
      title: '操作',
      key: 'action',
      render: () => <a onClick={() => handleModalVisible(true)}>编辑</a>,
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
        // request={(params: any) =>
        //   queryRule({
        //     current_page: params.current,
        //     page_size: params.pageSize,
        //     status: params.status,
        //   })
        // }
        // postData={(data) => {
        //   setPageCount(data.total_count);
        //   return data
        // }}
        search={false}
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
        />
      </CreateForm>
    </PageHeaderWrapper>
  );
};

export default AccrossConfig;
