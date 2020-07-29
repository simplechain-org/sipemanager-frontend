import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryChainList, addRule, updateRule, removeRule, queryContract } from './service';
import ChainModal from './components/ChainModal';

export default function ChainList() {
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<TableListItem> | undefined>(undefined);
  const [contractList, setContractList] = useState([]);
  const actionRef = useRef<ActionType>();
  const [pageCount, setPageCount] = useState(0);

  const alertMsg = (type: 'success' | 'error', msg: string) => {
    message[type](msg);
    if (type === 'success' && actionRef.current) {
      actionRef.current.reload();
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '创建时间',
      dataIndex: 'CreatedAt',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      width: 200,
    },
    {
      title: '链的名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '网络编号',
      dataIndex: 'network_id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: 'Token名称',
      dataIndex: 'coin_name',
    },
    {
      title: 'Token符号',
      dataIndex: 'symbol',
    },
    {
      title: '跨链合约地址',
      dataIndex: 'address',
      hideInForm: true,
      width: 180,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              setCurrent(record);
              const res = await queryContract(record.ID);
              setContractList(res.data || []);
              setVisible(true);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除吗?"
            onConfirm={async () => {
              const res = await removeRule(record.ID);
              if (res.code === 0) {
                alertMsg('success', '删除成功');
              }
            }}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleCancel = () => {
    setVisible(false);
    setCurrent(undefined);
  };

  const handleSubmit = async (values: Partial<TableListItem>) => {
    const id = current ? current.ID : '';
    console.log(typeof values.network_id);
    if (id) {
      const res: any = await updateRule({
        ...values,
        id,
      });
      if (res.code === 0) {
        alertMsg('success', '编辑成功');
        handleCancel();
      }
      // else {
      //   alertMsg('error', res.msg || '编辑失败');
      // }
    } else {
      const res: any = await addRule(values);
      if (res.code === 0) {
        alertMsg('success', '新建成功');
        handleCancel();
      }
      // else {
      //   alertMsg('error', res.msg || '新建失败');
      // }
    }
  };

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="区块链列表"
        actionRef={actionRef}
        rowKey="ID"
        toolBarRender={() => {
          return [
            <Button type="primary" onClick={() => setVisible(true)}>
              <PlusOutlined /> 新建
            </Button>,
          ];
        }}
        request={(params) => {
          return queryChainList({
            page_size: params.pageSize || 10,
            current_page: params.current || 1,
          });
        }}
        postData={(data: any) => {
          setPageCount(data.total_count);
          return data.page_data;
        }}
        search={false}
        options={false}
        tableAlertRender={false}
        columns={columns}
        rowSelection={false}
        pagination={{
          total: pageCount,
          defaultPageSize: 10,
        }}
      />
      <ChainModal
        current={current}
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        contractList={contractList}
      />
    </PageHeaderWrapper>
  );
}
