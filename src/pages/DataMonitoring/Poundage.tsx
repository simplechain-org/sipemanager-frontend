import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule } from './service';

export default function Poundage() {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '时间',
      dataIndex: 'CreatedAt',
      valueType: 'dateTimeRange',
    },
    {
      title: '跨链对',
      dataIndex: 'cross',
      hideInSearch: true,
    },
    {
      title: '锚定节点名称',
      dataIndex: 'node_name',
    },
    {
      title: '交易哈希',
      dataIndex: 'hash',
      hideInSearch: true,
    },
    {
      title: 'Makefinish手续费',
      dataIndex: 'fee',
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="ID"
        request={(params, sorter, filter) => {
          console.log(params);
          return queryRule({ ...params, sorter, filter });
        }}
        options={false}
        tableAlertRender={false}
        columns={columns}
        rowSelection={false}
      />
    </PageHeaderWrapper>
  );
}
