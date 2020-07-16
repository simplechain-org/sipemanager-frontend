import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';
import { TransactionsProps } from '../data.d';

export default function TransactionsCard(props: TransactionsProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.data) {
      setLoading(false);
    }
  }, [props.data]);

  const columns = [
    {
      title: '跨链对',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '累计跨链次数',
      dataIndex: 'Count',
      key: 'Count',
    },
  ];
  return (
    <Card
      loading={loading}
      bordered={false}
      title="跨链交易数监控"
      bodyStyle={{
        height: 238,
      }}
    >
      <Table<any>
        rowKey={(record) => record.ChainID}
        size="small"
        columns={columns}
        dataSource={props.data ? Object.values(props.data) : []}
        pagination={false}
      />
    </Card>
  );
}
