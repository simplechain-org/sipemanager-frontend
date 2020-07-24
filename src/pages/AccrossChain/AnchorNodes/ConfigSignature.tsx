import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, message, Divider, Space } from 'antd';
import React, { useState, useRef, Fragment } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { queryReward, rewardAdd } from './service';
import FormItem from '../components/FormItem';
import { TableListItem, FormPropsType } from './data';
import CreateForm from './components/CreateForm';
import EstimateModal from './components/EstimateModal';

interface PropsType {
  publicList: any;
}

const ConfigSignature = (props: PropsType) => {
  const actionRef = useRef<ActionType>();
  const [signatureModalVisible, handleSignatureModalVisible] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [estimateVisible, handleEstimateVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;

  const onReset = () => {
    resetFields();
  };

  const addHandle = async (params: any) => {
    const res = await rewardAdd(params);
    if (res.code === 0) {
      message.success('添加成功');
    } else {
      message.error(res.msg || '添加失败');
    }
  };
  const changeNode = (value: number) => {
    console.log('node change', value);
  };

  const submitHandle = () => {
    validateFields()
      .then((values) => {
        addHandle(values);
      })
      .catch((errorInfo) => {
        console.log('校验出错~', errorInfo);
      });
  };

  const cancleEstimate = () => {
    handleEstimateVisible(false);
  };

  const thirdColumns: ProColumns<TableListItem>[] = [
    {
      title: '更新时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '发起链',
      dataIndex: 'createdAt',
      key: 'createdAt',

      hideInSearch: true,
    },
    {
      title: '目标链',
      dataIndex: 'createdAt',
      key: 'createdAt',

      hideInSearch: true,
    },
    {
      title: '单次签名奖励',
      dataIndex: 'createdAt',
      key: 'createdAt',

      hideInSearch: true,
    },
    {
      title: '调整周期',
      dataIndex: 'createdAt',
      key: 'createdAt',

      hideInSearch: true,
    },
    {
      title: '已进行天数',
      dataIndex: 'createdAt',
      key: 'createdAt',

      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      hideInSearch: true,
      render: () => {
        return (
          <Space>
            <a
              onClick={() => {
                onReset();
                setIsEdit(true);
                handleSignatureModalVisible(true);
              }}
            >
              编辑
            </a>
            <Divider />
            <a>删除</a>
          </Space>
        );
      },
    },
  ];

  const addChildren = (
    <Fragment>
      <Divider />
      <p>调控周期：{90}天</p>
      <p>已经行：{77}天</p>
      <p>本周期交易笔数：{10000}次</p>
      <p>原单笔签名奖励：{0.12345678}SIPC/次</p>
      <Divider />
    </Fragment>
  );

  const footer = (
    <Fragment>
      <Button
        onClick={() => {
          handleEstimateVisible(true);
        }}
      >
        奖励估算计算器
      </Button>
      <Button type="primary" onClick={submitHandle}>
        提交
      </Button>
    </Fragment>
  );

  const fourthFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '发起链',
      fieldName: 'source_chain',
      isSelect: true,
      // dataSource: props.publicList.nodeList,
      dataSource: [],
      needChange: true,
      handle: changeNode,
    },
    {
      formItemYype: 'select',
      formItemLabel: '目标链',
      fieldName: 'target_chain',
      isSelect: true,
      dataSource: [],
      children: isEdit ? addChildren : null,
    },
    {
      formItemYype: 'text',
      formItemLabel: isEdit ? '原单笔签名奖励更改为' : '单笔签名奖励',
      fieldName: 'single',
      suffix: 'SIPC/次',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '调控周期',
      fieldName: 'cycle',
      isSelect: false,
      // dataSource: props.publicList.wallestList,
      suffix: '天',
      dataSource: [],
      children:
        '推荐公式：单笔签名奖励 = (锚定节点数 * 节点质押金额 * 质押年化率 * 调控周期天数) / (365 * 本周期交易数)，建议调控周期90天，到期后，若不修改，则自动续期。',
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="签名奖励配置"
        actionRef={actionRef}
        rowKey="key"
        options={false}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              onReset();
              setIsEdit(false);
              handleSignatureModalVisible(true);
            }}
          >
            <PlusOutlined /> 新增奖励配置
          </Button>,
        ]}
        request={(params: any) =>
          queryReward({
            page_size: params.pageSize || 10,
            current_page: params.current || 1,
            anchor_node_id: props.publicList.anchorNodeList[params.anchor_node_id].ID || '',
          })
        }
        search={false}
        // dataSource={[{ ID: 2 }]}
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
        onCancel={() => handleSignatureModalVisible(false)}
        modalVisible={signatureModalVisible}
        modalTitle={isEdit ? '编辑奖励配置' : '新增奖励配置'}
        footer={footer}
      >
        <FormItem form={form} formPropsList={fourthFormPropsList}>
          {/* {children} */}
        </FormItem>
      </CreateForm>
      <EstimateModal visible={estimateVisible} onCancel={cancleEstimate} />
    </PageHeaderWrapper>
  );
};

export default ConfigSignature;
