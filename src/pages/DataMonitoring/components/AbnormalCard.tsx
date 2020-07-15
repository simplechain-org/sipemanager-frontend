import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';
import { queryMaxUncle } from '../service';

export default function AbnormalCard() {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      title: '链名称',
      dataIndex: 'chainId',
      key: 'index',
    },
    {
      title: '近10000个区块最大分叉高度',
      dataIndex: 'blockNumber',
      key: 'keyword',
    },
  ];

  useEffect(() => {
    queryMaxUncle().then((res) => {
      console.log(res);
      setTableData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Card loading={loading} bordered={false} title="链分叉监控">
      <Table<any>
        rowKey={(record) => record.index}
        size="small"
        columns={columns}
        dataSource={tableData}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 5,
        }}
      />
    </Card>
  );
}
