import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import CreateForm from './components/CreateForm';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default function ChainList() {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '创建时间',
      dataIndex: 'CreatedAt',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '链的名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '网络编号',
      dataIndex: 'network_id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: 'Token名称',
      dataIndex: 'coin_name',
    },
    {
      title: 'Token符号',
      dataIndex: 'symbol',
    },
    {
      title: '跨链合约地址',
      dataIndex: 'DeletedAt',
    },
    // {
    //   title: '服务调用次数',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   hideInForm: true,
    //   renderText: (val: string) => `${val} 万`,
    // },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   hideInForm: true,
    //   valueEnum: {
    //     0: { text: '关闭', status: 'Default' },
    //     1: { text: '运行中', status: 'Processing' },
    //     2: { text: '已上线', status: 'Success' },
    //     3: { text: '异常', status: 'Error' },
    //   },
    // },
    // {
    //   title: '上次调度时间',
    //   dataIndex: 'updatedAt',
    //   sorter: true,
    //   valueType: 'dateTime',
    //   hideInForm: true,
    //   // renderFormItem: (item, { defaultRender, ...rest }, form) => {
    //   //   const status = form.getFieldValue('status');
    //   //   if (`${status}` === '0') {
    //   //     return false;
    //   //   }
    //   //   if (`${status}` === '3') {
    //   //     return <Input {...rest} placeholder="请输入异常原因！" />;
    //   //   }
    //   //   return defaultRender(item);
    //   // },
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => (
        <>
          <a
            onClick={() => {
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a>删除</a>
        </>
      ),
    },
  ];

  const actionRef = useRef<ActionType>();

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="区块链列表"
        actionRef={actionRef}
        rowKey="ID"
        toolBarRender={() => {
          return [
            <Button type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> 新建
            </Button>,
          ];
        }}
        request={(params, sorter, filter) => {
          console.log(params);
          return queryRule({ ...params, sorter, filter });
        }}
        search={false}
        options={false}
        tableAlertRender={false}
        columns={columns}
        rowSelection={false}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            console.log(value);
            // const success = await handleAdd(value);
            // if (success) {
            //   handleModalVisible(false);
            //   if (actionRef.current) {
            //     actionRef.current.reload();
            //   }
            // }
          }}
          rowKey="ID"
          type="form"
          form={{
            ...formLayout,
          }}
          columns={columns}
        />
      </CreateForm>
    </PageHeaderWrapper>
  );
}
