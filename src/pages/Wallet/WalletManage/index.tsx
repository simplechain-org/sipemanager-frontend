import { Button, Divider, Input, Form } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule } from './service';

const handleRemove = async (value: number) => {
  console.log(`删除key为${value}的列表项`);
};

const WalletManage: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState({});
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const { validateFields } = form;

  const onReset = () => {
    form.resetFields();
  };

  const updClick = (record: TableListItem) => {
    onReset();
    handleUpdateModalVisible(true);
    setCurrentItem(record);
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
      title: '钱包名称',
      dataIndex: 'name',
      key: 'name',
      hideInForm: true,
    },
    {
      title: '钱包地址',
      dataIndex: 'address',
      key: 'address',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleRemove(record.key || 0);
              // console.log('删除')
            }}
          >
            删除
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              updClick(record);
            }}
          >
            修改密码
          </a>
        </>
      ),
    },
  ];

  const submitHandle = () => {
    validateFields()
      .then((values) => {
        console.log('表单验证通过啦~  提交表单值', values, currentItem);
        handleUpdateModalVisible(false);
        actionRef.current?.reload();
      })
      .catch((error) => {
        console.log('错啦~', error);
      });
  };

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="账户列表"
        actionRef={actionRef}
        rowKey="key"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter as SorterResult<TableListItem>;
          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{
          sorter,
        }}
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              onReset();
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
      <CreateForm
        submitHandle={submitHandle}
        onReset={onReset}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <Form form={form}>
          <Form.Item
            label="私钥/助记词/keystore文件"
            name="content"
            rules={[
              {
                required: true,
                message: '请输入私钥/助记词/keystore文件',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="账户名称"
            name="wallet"
            rules={[
              {
                required: true,
                message: '请输入账户名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="钱包密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入钱包密码',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </CreateForm>
      <UpdateForm
        onCancel={() => handleUpdateModalVisible(false)}
        modalVisible={updateModalVisible}
        onReset={onReset}
        submitHandle={submitHandle}
      >
        <Form form={form}>
          <Form.Item label="账户名称">name</Form.Item>
          <Form.Item
            name="password"
            label="原密码"
            hasFeedback
            rules={[{ required: true, message: '请输入原密码!' }]}
          >
            <Input.Password
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            hasFeedback
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input.Password
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="确认密码"
            hasFeedback
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请再次输入密码!' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码输入不一致!'));
                },
              }),
            ]}
          >
            <Input.Password
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
        </Form>
      </UpdateForm>
    </PageHeaderWrapper>
  );
};

export default WalletManage;
