import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Space, Button, Modal, Form, Input } from 'antd';

import Card from '../../../components/Card/Card';

// export default function WalletManage() {
//   const [pagination, setPagination] = useState({page: 1, pageSize: 10, total: dataSource.length})
//   const [loading, setLoading] = useState(false)
//   const [visible, setVisible] = useState(false)

//   const tableChangeHandle = (newPagination: Pagination) => {
//     console.log('table changed ~', newPagination)
//   }

// const addHandle = () => {
//   setVisible(true)
// }

//   const handleOk = () => {
//     setVisible(false)
//   }

//   const handleCancel = () => {
//     setVisible(false)
//   }

// return (
//   <PageHeaderWrapper>
//     <div className="container">
//       <Card>
//         <Button type='primary' style={{float: 'right'}} onClick={addHandle}>新增</Button>
//       </Card>
//       <Table
//         rowKey={record => record.userId}
//         dataSource={dataSource}
//         columns={columns}
//         pagination={pagination}
//         loading={loading}
//         onChange={() => tableChangeHandle(pagination)}
//         bordered
//       />
//       <Modal
//         title='新增钱包'
//         visible={visible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <p>Some contents...</p>
//       </Modal>
//     </div>
//   </PageHeaderWrapper>
// );
// }
// interface IState {
//   visible: boolean,
//     loading: boolean,
//     dataSource: Array<object>,
//     pagination: {
//       page: number,
//       pageSize: number
//     }
// }

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

// interface PropsType {
//   form: Form;
// }
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
  updVisible: false,
  loading: false,
  data: [],
  pagination: {
    page: 1,
    pageSize: 10,
  },
};

const columns = [
  {
    title: '创建时间',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '钱包名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '钱包地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space>
        <a>修改密码</a>
        <a>删除</a>
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
    const { loading, addVisible, updVisible, pagination } = this.state;
    // const { getFieldProps } = this.props.form
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
            title="新增钱包账户"
            visible={addVisible}
            onOk={() => this.handleOk('addVisible')}
            onCancel={() => this.handleCancel('addVisible')}
          >
            <div className="modal_container">
              <Form name="nest-messages" onFinish={(values) => this.handleOk('addVisible', values)}>
                <Form.Item label="私钥/助记词/keystore文件" name="content">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="账户名称" name="name">
                  <Input />
                </Form.Item>
                <Form.Item label="钱包密码" name="password">
                  <Input type="password" />
                </Form.Item>
              </Form>
            </div>
          </Modal>
          <Modal
            centered
            title="修改钱包密码"
            visible={updVisible}
            onOk={() => this.handleOk('updVisible')}
            onCancel={() => this.handleCancel('updVisible')}
          >
            <div className="modal_container">
              <Form name="nest-messages" onFinish={(values) => this.handleOk('addVisible', values)}>
                <Form.Item label="钱包名称">
                  <div>wallet name</div>
                </Form.Item>
                <Form.Item label="原密码" name="password">
                  <Input type="password" />
                </Form.Item>
                <Form.Item label="新密码" name="newPassword">
                  <Input type="password" />
                </Form.Item>
                <Form.Item label="确认密码" name="confirmPassword">
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
