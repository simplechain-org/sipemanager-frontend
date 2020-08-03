import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Form } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import UploadForm from './components/UploadForm';
import FormItem from '../components/FormItem';
import { TableListItem } from './data';
import { queryRule, addRule, removeRule, updateRule } from './service';

const ContractManage: React.FC<{}> = () => {
  const [uploadModalVisible, handleUploadModalVisible] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<TableListItem | undefined>(undefined);
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [pageCount, setPageCount] = useState(0);

  const onReset = () => {
    form.resetFields();
  };

  const alertMsg = (type: 'success' | 'error', msg: string) => {
    message[type](msg);
    if (type === 'success' && actionRef.current) {
      actionRef.current.reload();
    }
  };

  const addHandle = async (params: any) => {
    const id = currentItem ? currentItem.id : null;
    let res;
    if (id) {
      res = await updateRule({ ...params, id });
    } else {
      res = await addRule(params);
    }

    if (res.code === 0) {
      alertMsg('success', id ? '编辑成功' : '上传成功');
    }
    // else {
    //   alertMsg('error', res.msg || '操作失败');
    // }
    handleUploadModalVisible(false);
    setCurrentItem(undefined);
    actionRef.current?.reload();
  };

  const submitHandle = () => {
    form
      .validateFields()
      .then((values) => {
        addHandle(values as TableListItem);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const removeHandle = async (id: number) => {
    const res = (await removeRule(id)) || {};
    if (res.code === 0) {
      alertMsg('success', '删除成功');
    }
    actionRef.current?.reload();
    // else {
    //   alertMsg('error', res.msg || '删除失败');
    // }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'date',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '合约名称',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '请输入合约名称',
        },
      ],
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      hideInTable: true,
      hideInForm: true,
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
              setCurrentItem(record);
              handleUploadModalVisible(true);
              form.setFieldsValue(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a onClick={() => removeHandle(record.id)}>删除</a>
        </>
      ),
    },
  ];

  const formPropsList = [
    {
      formItemYype: 'text',
      formItemLabel: '合约名称',
      fieldName: 'name',
      isRequire: true,
      dataSource: [],
    },
    {
      formItemYype: 'textarea',
      formItemLabel: '合约ABI',
      fieldName: 'abi',
      isRequire: true,
      dataSource: [],
    },
    {
      formItemYype: 'textarea',
      formItemLabel: 'Bytecode',
      fieldName: 'bin',
      isRequire: true,
      dataSource: [],
    },
    {
      formItemYype: 'textarea',
      formItemLabel: '合约源码',
      fieldName: 'sol',
      isRequire: true,
      dataSource: [],
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="合约列表"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              onReset();
              handleUploadModalVisible(true);
            }}
          >
            <PlusOutlined /> 上传本地合约
          </Button>,
        ]}
        options={false}
        request={(params) => {
          return queryRule({
            page_size: params.pageSize || 10,
            current_page: params.current || 1,
            // status: '',
          });
        }}
        postData={(data: any) => {
          setPageCount(data.total_count);
          return data.page_data;
        }}
        pagination={{
          total: pageCount,
          defaultPageSize: 10,
        }}
        columns={columns}
      />
      <UploadForm
        onCancel={() => handleUploadModalVisible(false)}
        modalVisible={uploadModalVisible}
        onReset={onReset}
        submitHandle={submitHandle}
      >
        <FormItem form={form} formPropsList={formPropsList} />
      </UploadForm>
    </PageHeaderWrapper>
  );
};

export default ContractManage;
