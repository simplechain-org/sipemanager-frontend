import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, message, Divider } from 'antd';
import React, { useState, useRef, Fragment } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { queryReward, addRule } from './service';
import FormItem from '../components/FormItem';
import { TableListItem, FormPropsType } from './data';
import CreateForm from './components/CreateForm';

interface PropsType {
  publicList: any;
}

const AddReward = (props: PropsType) => {
  const actionRef = useRef<ActionType>();
  const [provideModalVisible, handleProvideModalVisible] = useState<boolean>(false);
  const [signatureModalVisible, handleSignatureModalVisible] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState(0);
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;

  const onReset = () => {
    resetFields();
  };

  const addHandle = async (params: any) => {
    const res = await addRule(params);
    if (res.code === 0) {
      message.success('添加成功');
    } else {
      message.error(res.msg || '添加失败');
    }
  };
  const changeNode = async () => {};

  const submitHandle = () => {
    validateFields()
      .then((values) => {
        addHandle(values);
      })
      .catch((errorInfo) => {
        console.log('校验出错~', errorInfo);
      });
  };

  const thirdColumns: ProColumns<TableListItem>[] = [
    {
      title: '发放时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '锚定节点名称',
      dataIndex: 'name',
      key: 'name',
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
      title: '奖励池总额',
      dataIndex: 'total',
      key: 'total',
      hideInSearch: true,
    },
    {
      title: '签名量占比',
      dataIndex: 'percent',
      key: 'percent',
      hideInSearch: true,
    },
    {
      title: '奖励值',
      dataIndex: 'bonus',
      key: 'bonus',
      hideInSearch: true,
    },
    {
      title: '交易哈希',
      dataIndex: 'tx_hash',
      key: 'tx_hash',
      hideInForm: true,
      hideInSearch: true,
    },
  ];

  const children = (
    <Fragment>
      <Divider />
      <p>锚定节点数：</p>
      <p>本周期交易数：</p>
      <p>原签名奖励：</p>
      <Divider />
      <p>
        建议奖励签名计算公式：单笔签名奖励 =（锚定节点数 * 节点质押金额 * 质押年化率 *
        调控周期天数）/ （365 *
        本周期交易数），其中质押年化率建议10%，调控天数建议90天，规则管理员可根据实际情况自行调整。
      </p>
      <Divider />
    </Fragment>
  );

  const addChildren = (
    <Fragment>
      <Divider />
      <p>剩余奖池总额：</p>
      <p>单笔签名奖励：</p>
      <p>本期总签名数：</p>
      <p>签名工作量占比：</p>
      <Divider />
    </Fragment>
  );

  const thirdFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'chain_a',
      isSelect: true,
      dataSource: props.publicList.nodeList,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择锚定节点',
      fieldName: 'chain_a_node',
      isSelect: true,
      dataSource: props.publicList.anchorNodeList,
      children: addChildren,
    },
    {
      formItemYype: 'select',
      formItemLabel: '奖励Token类型',
      fieldName: 'chain_b',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '签名奖励值',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
      extra: `本期建议奖励${'1.1111SIPC'}`,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择账户',
      fieldName: 'wallet',
      isSelect: false,
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

  const fourthFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'chain_a',
      isSelect: true,
      dataSource: props.publicList.nodeList,
      needChange: true,
      handle: changeNode,
      children,
    },
    {
      formItemYype: 'select',
      formItemLabel: '更改奖励Token类型为',
      fieldName: 'chain_b',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '更改签名奖励为',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择账户',
      fieldName: 'wallet',
      isSelect: false,
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
      <ProTable<TableListItem>
        headerTitle="签名奖励列表"
        actionRef={actionRef}
        rowKey="key"
        options={false}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              onReset();
              handleSignatureModalVisible(true);
            }}
          >
            <PlusOutlined /> 配置签名奖励
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              onReset();
              handleProvideModalVisible(true);
            }}
          >
            <PlusOutlined /> 新增发放奖励
          </Button>,
        ]}
        request={(params: any) =>
          queryReward({
            page_size: params.pageSize || 10,
            current_page: params.current || 1,
            anchor_node_id: props.publicList.anchorNodeList[params.anchor_node_id].ID || '',
          })
        }
        postData={(data: any) => {
          setPageCount(data.total_count);
          return data.page_data;
        }}
        pagination={{
          total: pageCount,
          defaultPageSize: 10,
        }}
        columns={thirdColumns}
      />
      <CreateForm
        onCancel={() => handleProvideModalVisible(false)}
        onReset={onReset}
        onClick={submitHandle}
        modalVisible={provideModalVisible}
        modalTitle="新增发放奖励"
      >
        <FormItem form={form} formPropsList={thirdFormPropsList} />
      </CreateForm>
      <CreateForm
        onCancel={() => handleSignatureModalVisible(false)}
        onReset={onReset}
        onClick={submitHandle}
        modalVisible={signatureModalVisible}
        modalTitle="配置签名奖励"
      >
        <FormItem form={form} formPropsList={fourthFormPropsList}>
          {children}
        </FormItem>
      </CreateForm>
    </>
  );
};

export default AddReward;
