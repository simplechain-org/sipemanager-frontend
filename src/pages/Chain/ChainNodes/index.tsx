import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Form, Select, message, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import UpdateForm from './components/UpdateForm';
import { TableListItem, ChainListItem } from './data.d';
import { queryRule, queryChain, addRule, removeRule } from './service';

const WalletManage: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<TableListItem | undefined>(undefined);
  const [modalTitle, setModalTitle] = useState('新增节点');
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const { setFieldsValue, validateFields } = form;
  const [chainList, setChainList] = useState<ChainListItem[]>([]);

  const onReset = () => {
    form.resetFields();
  };

  const alertMsg = (type: 'success' | 'error', msg: string) => {
    message[type](msg);
    if (type === 'success' && actionRef.current) {
      actionRef.current.reload();
    }
  };

  const getChainList = async () => {
    const res = await queryChain();
    setChainList(res.data);
  };

  const handleRemove = async (value: number) => {
    const res = await removeRule(value);
    if (res?.code === 0) {
      actionRef.current?.reload();
      alertMsg('success', '删除成功');
    } else {
      alertMsg('error', '删除失败');
    }
  };

  const addHandle = async (params: any) => {
    const ID = currentItem?.ID;
    const res = await addRule(ID ? { ...currentItem, ...params } : params);
    if (res.code === 0) {
      alertMsg('success', ID ? '编辑成功' : '添加成功');
    } else {
      alertMsg('error', res.msg || (ID ? '编辑失败' : '添加失败'));
    }
  };

  useEffect(() => {
    getChainList();
  }, []);

  const updClick = (record: TableListItem) => {
    setModalTitle('编辑节点');
    onReset();
    setFieldsValue(record);
    setCurrentItem(record);
    handleModalVisible(true);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '创建时间',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      valueType: 'date',
      hideInForm: true,
    },
    {
      title: '节点名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'IP地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '端口',
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: '接入链',
      dataIndex: 'chain_name',
      key: 'chain_name',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              updClick(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => {
              handleRemove(record.ID || 0);
              console.log('删除');
            }}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const submitHandle = () => {
    validateFields()
      .then((values) => {
        console.log('  values', values);
        addHandle(values);
        handleModalVisible(false);
        setCurrentItem(undefined);
        actionRef.current?.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="链节点列表"
        actionRef={actionRef}
        rowKey="ID"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              onReset();
              setModalTitle('新增节点');
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        options={false}
        request={(params) => queryRule(params)}
        columns={columns}
      />
      <UpdateForm
        modalTitle={modalTitle}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        onReset={onReset}
        submitHandle={submitHandle}
      >
        <Form form={form}>
          <Form.Item
            label="接入链"
            name="chain_id"
            rules={[{ required: true, message: '请选择接入链!' }]}
          >
            <Select>
              {chainList.map((item) => (
                <Select.Option key={item.ID} value={item.ID}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="节点名称"
            rules={[{ required: true, message: '请输入节点名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="IP地址"
            rules={[{ required: true, message: '请输入IP地址!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="port" label="端口" rules={[{ required: true, message: '请输入端口!' }]}>
            <Input
              onChange={(e) => {
                if (e.target.value === '') {
                  return;
                }
                const newNumber = parseInt(e.target.value || '0', 10);
                if (Number.isNaN(newNumber)) {
                  return;
                }
                form.setFieldsValue({
                  port: newNumber,
                });
              }}
            />
          </Form.Item>
        </Form>
      </UpdateForm>
    </PageHeaderWrapper>
  );
};

export default WalletManage;
