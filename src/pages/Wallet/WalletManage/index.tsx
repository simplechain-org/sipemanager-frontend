import { Button, Divider, Input, Form, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem, UpdParams } from './data.d';
import { queryRule, addRule, updateRule, removeRule } from './service';

const WalletManage: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<TableListItem | undefined>(undefined);
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const { validateFields } = form;

  const onReset = () => {
    form.resetFields();
  };

  const addHandle = async (values: TableListItem) => {
    const addRes = await addRule(values);
    if (addRes.code === 0) {
      actionRef.current?.reload();
      handleModalVisible(false);
      message.success('操作成功');
    }
    //  else {
    //   message.error(addRes.msg || '操作失败');
    // }
  };

  const updHandle = async (values: UpdParams) => {
    const addRes = await updateRule(values);
    if (addRes.code === 0) {
      actionRef.current?.reload();
      handleUpdateModalVisible(false);
      message.success('操作成功');
      setCurrentItem(undefined);
    }
    //  else {
    //   message.error(addRes.msg || '操作失败');
    // }
  };

  const updClick = (record: TableListItem) => {
    onReset();
    handleUpdateModalVisible(true);
    setCurrentItem(record);
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
            onClick={async () => {
              const res = await removeRule({ wallet_id: record.ID });
              if (res.code === 0) {
                message.success('删除成功');
                actionRef.current?.reload();
              }
              // else {
              //   message.error(res.msg || '删除失败');
              // }
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
        if (currentItem?.ID) {
          updHandle({
            wallet_id: currentItem?.ID,
            old_password: values.old_password,
            new_password: values.new_password,
          });
        } else {
          addHandle(values as TableListItem);
        }
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
        rowKey="ID"
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
            labelCol={{ span: 24 }}
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
            name="name"
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
            <Input.Password autoComplete="new-password" />
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
          <Form.Item label="账户名称">{currentItem?.name}</Form.Item>
          <Form.Item
            name="old_password"
            label="原密码"
            hasFeedback
            rules={[{ required: true, message: '请输入原密码!' }]}
          >
            <Input.Password
              autoComplete="new-password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item
            name="new_password"
            label="新密码"
            hasFeedback
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input.Password
              autoComplete="new-password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="确认密码"
            hasFeedback
            dependencies={['new_password']}
            rules={[
              { required: true, message: '请再次输入密码!' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码输入不一致!'));
                },
              }),
            ]}
          >
            <Input.Password
              autoComplete="new-password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
        </Form>
      </UpdateForm>
    </PageHeaderWrapper>
  );
};

export default WalletManage;
