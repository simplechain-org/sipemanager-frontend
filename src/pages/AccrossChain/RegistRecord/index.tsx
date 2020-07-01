import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Space, Button, Modal, Form, Input } from 'antd';

import Card from '../../../components/Card/Card';

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

interface FormValues {
  name: string;
  address: string;
  password: string;
  userId?: number;
}

const dataSource = [
  {
    userId: 1,
    name: '胡彦斌',
    address: '西湖区湖底公园1号',
    content: [1, 2, 3],
  },
  {
    userId: 2,
    name: '胡彦斌',
    address: '西湖区湖底公园1号',
    content: [1, 2, 3],
  },
  {
    userId: 3,
    name: '胡彦斌',
    address: '西湖区湖底公园1号',
    content: [1, 2, 3],
  },
  {
    userId: 4,
    name: '胡彦斌',
    address: '西湖区湖底公园1号',
    content: [1, 2, 3],
  },
  {
    userId: 5,
    name: '胡彦斌',
    address: '西湖区湖底公园1号',
    content: [1, 2, 3],
  },
  {
    userId: 6,
    name: '胡彦斌',
    address: '西湖区湖底公园1号',
    content: [1, 2, 3],
  },
  {
    userId: 7,
    name: '胡彦斌',
    address: '西湖区湖底公园1号',
    content: [1, 2, 3],
  },
  {
    userId: 8,
    name: '胡彦斌',
    address: '西湖区湖底公园1号',
    content: [1, 2, 3],
  },
  {
    userId: 9,
    name: '胡彦斌',
    address: '西湖区湖底公园1号',
    content: [1, 2, 3],
  },
  {
    userId: 10,
    name: '胡彦斌',
    address: '西湖区湖底公园1号',
    content: [1, 2, 3],
  },
];
const initialState = {
  addVisible: false,
  loading: false,
  data: [],
  pagination: {
    page: 1,
    pageSize: 10,
  },
};

const columns = [
  {
    title: '注册时间',
    dataIndex: 'CreatedAt',
    key: 'CreatedAt',
  },
  {
    title: '发起链',
    dataIndex: 'source_chain_id',
    key: 'source_chain_id',
  },
  {
    title: '目标链',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '最低签名数',
    dataIndex: 'confirm',
    key: 'confirm',
  },
  {
    title: '锚定节点数',
    dataIndex: 'anchor_addresses',
    key: 'anchor_addresses',
  },
  {
    title: '注册TX哈希',
    dataIndex: 'tx_hash',
    key: 'tx_hash',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space>
        <a>编辑</a>
        <a>查看</a>
      </Space>
    ),
  },
];

type IState = Readonly<typeof initialState>;

export default class WalletManage extends React.Component<IState> {
  readonly state: IState = initialState;

  addHandle = (modalType: string) => {
    console.log(modalType);
    this.openModal(modalType);
  };

  tableChangeHandle = (newPagination: any) => {
    console.log('newPagination', newPagination);
  };

  openModal = (modalType: string) => {
    console.log(modalType);
    this.setState({
      [modalType]: true,
    });
  };

  closeModal = (modalType: string) => {
    console.log(modalType);
    this.setState({
      [modalType]: false,
    });
  };

  handleOk = (modalType: string) => {
    this.closeModal(modalType);
  };

  handleCancel = (modalType: string) => {
    this.closeModal(modalType);
  };

  render() {
    const { loading, addVisible, pagination } = this.state;
    return (
      <PageHeaderWrapper>
        <div className="container">
          <Card>
            <Button
              type="primary"
              style={{ float: 'right' }}
              onClick={() => this.addHandle('addVisible')}
            >
              新增
            </Button>
          </Card>
          <Table
            rowKey={(record) => record.userId}
            dataSource={dataSource}
            columns={columns}
            pagination={pagination}
            loading={loading}
            onChange={() => this.tableChangeHandle(pagination)}
            bordered
          />
          <Modal
            centered
            title="注册新的跨链对"
            visible={addVisible}
            onOk={() => this.handleOk('addVisible')}
            onCancel={() => this.handleCancel('addVisible')}
          >
            <div className="modal_container">
              <Form name="nest-messages" onFinish={(values) => this.handleOk('addVisible', values)}>
                <Form.Item label="链A" name="name">
                  <Input />
                </Form.Item>
                <Form.Item label="链A的节点" name="password">
                  <Input type="password" />
                </Form.Item>
                <Form.Item label="链B" name="password">
                  <Input type="password" />
                </Form.Item>
                <Form.Item label="链B的节点" name="password">
                  <Input type="password" />
                </Form.Item>
                <Form.Item label="锚定节点地址1" name="name">
                  <Input />
                  {/* <Button>新增</Button> */}
                </Form.Item>
                <Form.Item label="地址1名称" name="password">
                  <Input type="password" />
                </Form.Item>
                <Form.Item label="锚定节点地址2" name="password">
                  <Input type="password" />
                  {/* <Button>删除</Button> */}
                </Form.Item>
                <Form.Item label="地址2名称" name="password">
                  <Input type="password" />
                </Form.Item>
                <Form.Item label="锚定节点质押金额" name="name">
                  <Input />
                </Form.Item>
                <Form.Item label="最低签名数" name="password">
                  <Input type="password" />
                </Form.Item>
                <Form.Item label="选择钱包账户" name="password">
                  <Input type="password" />
                </Form.Item>
                <Form.Item label="钱包密码" name="password">
                  <Input type="password" />
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </div>
      </PageHeaderWrapper>
    );
  }
}
