import React, { useState } from 'react';
import { Card, Table } from 'antd';

export default function TransactionsCard() {
  const [loading] = useState(false);

  const columns = [
    {
      title: '跨链对',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '累计跨链次数',
      dataIndex: 'keyword',
      key: 'keyword',
    },
  ];
  return (
    <Card loading={loading} bordered={false} title="跨链交易数监控">
      <Table<any>
        rowKey={(record) => record.index}
        size="small"
        columns={columns}
        dataSource={[]}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 5,
        }}
      />
    </Card>
  );
}
