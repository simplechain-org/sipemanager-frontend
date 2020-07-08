import { Card, Select, Table } from 'antd';
import React, { useState } from 'react';

function TitleContent() {
  return (
    <>
      <span>锚定节点监控</span>
      <Select
        style={{
          float: 'right',
          width: 180,
          marginRight: 16,
        }}
        size="small"
        placeholder="选择跨链对"
        allowClear
      >
        <Select.Option value="demo">Demo</Select.Option>
      </Select>
    </>
  );
}

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
    <Card loading={loading} bordered={false} title={<TitleContent />}>
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
