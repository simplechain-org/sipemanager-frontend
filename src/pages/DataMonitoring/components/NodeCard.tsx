import React, { useState } from 'react';
import { Card, Table } from 'antd';

export default function NodeCard() {
  const [loading] = useState(false);

  const columns = [
    {
      title: '锚定节点名称',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'A链账户余额',
      dataIndex: 'keyword',
      key: 'keyword',
      render: (text: React.ReactNode) => `${text}sipc`,
    },
    {
      title: 'B链账户余额',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '是否在线',
      dataIndex: 'range',
      key: 'range',
    },
    {
      title: '连续未签名交易数',
      dataIndex: 'heihei',
      key: 'heihei',
    },
  ];

  return (
    <Card loading={loading} bordered={false} title="锚定节点监控">
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
