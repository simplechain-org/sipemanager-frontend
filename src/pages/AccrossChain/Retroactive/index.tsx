import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import { TableListItem, ChainListItem } from './data';
import { queryRule, addRule, queryChain } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: any) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addRule({ ...fields, network_id: parseInt(fields.chain_id, 10) });
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

const Retroactive: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [pageCount] = useState(0);
  // const [pageCount, setPageCount] = useState(0);
  const [chainList, setChainList] = useState([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '选择节点',
      dataIndex: 'node',
      key: 'node',
      hideInForm: true,
      hideInTable: true,
      valueEnum: {},
    },
    {
      title: '登记时间',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '原交易哈希',
      dataIndex: 'tx_hash',
      key: 'tx_hash',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '请输入原交易哈希',
        },
      ],
    },
    {
      title: '交易所在链',
      // dataIndex: 'network_id',
      // key: 'network_id',
      dataIndex: 'chain_id',
      key: 'chain_id',
      hideInSearch: true,
      hideInTable: true,
      rules: [
        {
          required: true,
          message: '请选择交易所在链',
        },
      ],
      valueEnum: { ...chainList },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      hideInSearch: true,
      hideInForm: true,
      render: (text) => {
        switch (text) {
          case 1:
            return '待签';
          case 2:
            return '签名完成';
          default:
            return '';
        }
      },
    },
  ];

  const getChainList = async () => {
    const res = await queryChain();
    setChainList(
      res.data.page_data.map((item: ChainListItem) => ({
        text: item.name,
        value: item.ID,
        ...item,
      })),
    );
  };

  useEffect(() => {
    getChainList();
  }, []);

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="补签登记记录"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        options={false}
        // request={(params) => queryRule(params)}
        request={(params: any) =>
          queryRule({
            current_page: params.current,
            page_size: params.pageSize,
            status: params.status,
          })
        }
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

export default Retroactive;
