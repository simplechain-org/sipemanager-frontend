// import React, { useState } from 'react';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { Table, Space, Pagination } from 'antd';
import { Table, Space } from 'antd';

// interface Pagination {
//   page: number,
//   pageSize: number,
//   total: number
// }

// interface Item {
//   key: string,
//   name: string,
//   age: number,
//   address: string
// }

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '3',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '4',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '5',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '6',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '7',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '8',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '9',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '10',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '11',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '12',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '13',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '14',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '15',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space>
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

export default function WalletManage() {
  // const [pagination, setPagination] = useState({page: 1, pageSize: 10, total: 14})
  // const [loading, setLoading] = useState(false)

  // const tableChangeHandle = (newPagination: Pagination) => {
  //   console.log('table changed ~', newPagination)
  // }

  return (
    <PageHeaderWrapper>
      <div className="container">
        <Table
          rowKey="walletManage"
          dataSource={dataSource}
          columns={columns}
          // pagination={pagination}
          // loading={loading}
          // onChange={() => tableChangeHandle(pagination)}
          bordered
        />
        ;
      </div>
    </PageHeaderWrapper>
  );
}
