import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Form, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule } from './service';

const handleRemove = async (value: number) => {
  console.log(`删除key为${value}的列表项`);
};

const WalletManage: React.FC<{}> = () => {
  const [sorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState({});
  const [modalTitle, setModalTitle] = useState('新增节点');
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const { setFieldsValue, validateFields } = form;

  const onReset = () => {
    form.resetFields();
  };

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
      dataIndex: 'createAt',
      key: 'createAt',
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
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '接入链',
      dataIndex: 'chain_id',
      key: 'chain_id',
      valueEnum: {},
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
          <a
            onClick={() => {
              handleRemove(record.key || 0);
              console.log('删除');
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  const submitHandle = () => {
    validateFields()
      .then((values) => {
        console.log('修改密码表单值', values, currentItem);
        handleModalVisible(false);
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
        rowKey="key"
        params={{
          sorter,
        }}
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
              <Select.Option value={1}>111</Select.Option>
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
            <Input />
          </Form.Item>
        </Form>
      </UpdateForm>
    </PageHeaderWrapper>
  );
};

export default WalletManage;
