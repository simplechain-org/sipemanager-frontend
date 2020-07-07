import React, { useState } from 'react';
import { Card, Table } from 'antd';

export default function AbnormalCard() {
  const [loading] = useState(false);

  const columns = [
    {
      title: '链名称',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '近10000个区块最大分叉高度',
      dataIndex: 'keyword',
      key: 'keyword',
    },
  ];
  return (
    <Card loading={loading} bordered={false} title="链分叉监控">
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
