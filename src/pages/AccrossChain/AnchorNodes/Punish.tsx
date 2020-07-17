import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, message, Select, Input } from 'antd';
import React, { useState, useRef, Fragment } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { queryPunish, addPunish } from './service';
import FormItem from '../components/FormItem';
import { PunishListItem, FormPropsType } from './data';
import CreateForm from './components/CreateForm';

interface PropsType {
  publicList: any;
}
const Punish = (props: PropsType) => {
  const actionRef = useRef<ActionType>();
  const [punishModalVisible, handlePunishModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;
  const [pageCount, setPageCount] = useState(0);
  // const [tokenList, setTokenList] = useState([]);
  const [isDisplay, setDisplay] = useState(false);

  const onReset = () => {
    resetFields();
    setDisplay(false);
  };

  const addHandle = async (params: PunishListItem) => {
    const res = await addPunish(params);
    if (res.code === 0) {
      message.success('添加成功');
    } else {
      message.error(res.msg || '添加失败');
    }
  };

  const submitHandle = () => {
    validateFields()
      .then((values) => {
        console.log({ ...values, coin: props.publicList.nodeList[values.node_id].coin_name || '' });
        addHandle(values as PunishListItem);
      })
      .catch((errorInfo) => {
        console.log('校验出错~', errorInfo);
      });
  };

  const fourthColumns: ProColumns<PunishListItem>[] = [
    {
      title: '时间',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '锚定节点名称',
      dataIndex: 'anchor_node_name',
      key: 'anchor_node_name',
      hideInSearch: true,
    },
    {
      title: '锚定节点',
      dataIndex: 'anchor_node_id',
      key: 'anchor_node_id',
      hideInTable: true,
      valueEnum: props.publicList.anchorNodeList,
    },
    {
      title: '管理类型',
      dataIndex: 'manage_type',
      key: 'manage_type',
      hideInSearch: true,
    },
    {
      title: '数值',
      dataIndex: ['value', 'coin'],
      key: 'value',
      hideInSearch: true,
      render: (_, record) => {
        return <span>{`${record.value}${record.coin}`}</span>;
      },
    },
  ];

  const children = (
    <Fragment>
      <Form.Item
        label="Token类型"
        name="coin"
        rules={[{ required: true, message: '请选择Token类型' }]}
      >
        <Select>
          <Select.Option value={1111}>1111</Select.Option>
          <Select.Option value={2222}>2222</Select.Option>
          <Select.Option value={3333}>3333</Select.Option>
          {/* {
            tokenList.map(item => <Select.Option value={item.ID}>{item.name}</Select.Option>)
          } */}
        </Select>
      </Form.Item>
      <Form.Item
        label="扣减数量"
        name="value"
        rules={[{ required: true, message: '请输入扣减数量' }]}
      >
        <Input />
      </Form.Item>
    </Fragment>
  );

  const changeDisplay = (value: number) => {
    if (value === 1) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  const fiftyFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'node_id',
      isSelect: true,
      dataSource: props.publicList.nodeList,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择锚定节点',
      fieldName: 'anchor_node_id',
      isSelect: true,
      dataSource: props.publicList.anchorNodeList,
    },
    {
      formItemYype: 'select',
      formItemLabel: '管理类型',
      fieldName: 'manage_type',
      isSelect: true,
      // dataSource: [],
      needChange: true,
      handle: changeDisplay,
      dataSource: [
        {
          ID: 1,
          name: 'Token类型',
        },
        {
          ID: 2,
          name: '抵押类型',
        },
        {
          ID: 3,
          name: '质押金额',
        },
      ],
      children: isDisplay && children,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择账户',
      fieldName: 'wallet_id',
      isSelect: true,
      dataSource: props.publicList.wallestList,
    },
    {
      formItemYype: 'password',
      formItemLabel: '钱包密码',
      fieldName: 'password',
      isSelect: false,
      dataSource: [],
    },
  ];

  return (
    <>
      <ProTable<PunishListItem>
        headerTitle="惩罚管理列表"
        actionRef={actionRef}
        rowKey="key"
        options={false}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              onReset();
              handlePunishModalVisible(true);
            }}
          >
            <PlusOutlined /> 管理锚定节点
          </Button>,
        ]}
        request={(params: any) =>
          queryPunish({
            page_size: params.pageSize || 10,
            current_page: params.current || 1,
            anchor_node_id: props.publicList.anchorNodeList[params.anchor_node_id].ID || '',
          })
        }
        postData={(data: any) => {
          setPageCount(data.total_count);
          return data.page_data;
        }}
        pagination={{ total: pageCount, defaultPageSize: 10 }}
        columns={fourthColumns}
      />
      <CreateForm
        onCancel={() => {
          setDisplay(false);
          handlePunishModalVisible(false);
        }}
        onReset={onReset}
        onClick={submitHandle}
        modalVisible={punishModalVisible}
        modalTitle="管理锚定节点"
      >
        <FormItem form={form} formPropsList={fiftyFormPropsList} />
      </CreateForm>
    </>
  );
};

export default Punish;
