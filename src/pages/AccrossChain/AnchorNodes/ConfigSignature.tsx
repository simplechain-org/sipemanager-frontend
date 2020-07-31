import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, message, Divider, Space } from 'antd';
import React, { useState, useRef, Fragment, useEffect } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  addRewardConfig,
  queryRewardConfigList,
  queryChain,
  deleteReward,
  updateRewardConfig,
} from './service';
import FormItem from '../components/FormItem';
import { RewardListItem, FormPropsType } from './data';
import CreateForm from './components/CreateForm';
import EstimateModal from './components/EstimateModal';

const ConfigSignature = () => {
  const actionRef = useRef<ActionType>();
  const [signatureModalVisible, handleSignatureModalVisible] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [estimateVisible, handleEstimateVisible] = useState<boolean>(false);
  const [chainList, setChainList] = useState([]);
  const [currentReward, setCurrentReward] = useState<RewardListItem | null>(null);
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;

  const onReset = () => {
    resetFields();
  };

  useEffect(() => {
    async function getChainList() {
      const res = await queryChain();
      setChainList(res.data.page_data);
    }
    getChainList();
  }, []);

  const addHandle = async (params: any) => {
    const res = await addRewardConfig(params);
    if (res.code === 0) {
      message.success('添加成功');
    }
    // else {
    //   message.error(res.msg || '添加失败');
    // }
    handleSignatureModalVisible(false);
    setIsEdit(false);
    actionRef.current?.reload();
  };

  const updateHandle = async (params: any) => {
    const res = await updateRewardConfig(params);
    if (res.code === 0) {
      message.success('编辑成功');
    }
    // else {
    //   message.error(res.msg || '编辑失败');
    // }
    handleSignatureModalVisible(false);
    setIsEdit(false);
    actionRef.current?.reload();
  };
  const changeNode = (value: number) => {
    console.log('node change', value);
  };

  const submitHandle = () => {
    validateFields()
      .then((values) => {
        const params = {
          ...values,
          regulation_cycle: parseInt(values.regulation_cycle, 10),
        };
        const editParams = {
          ...values,
          id: currentReward?.id,
          regulation_cycle: parseInt(values.regulation_cycle, 10),
        };
        if (isEdit) {
          updateHandle(editParams);
        } else {
          addHandle(params);
        }
      })
      .catch((errorInfo) => {
        console.log('校验出错~', errorInfo);
      });
  };

  const cancleEstimate = () => {
    handleEstimateVisible(false);
  };

  const deleteHandle = async (record: RewardListItem) => {
    const res = await deleteReward(record.id);
    if (res.code === 0) {
      message.success('删除成功');
      actionRef.current?.reload();
    }
  };

  const thirdColumns: ProColumns<RewardListItem>[] = [
    {
      title: '更新时间',
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '发起链',
      dataIndex: 'source_chain_name',
      key: 'source_chain_name',
      hideInSearch: true,
    },
    {
      title: '目标链',
      dataIndex: 'target_chain_name',
      key: 'target_chain_name',
      hideInSearch: true,
    },
    {
      title: '单次签名奖励',
      dataIndex: 'sign_reward',
      key: 'sign_reward',
      hideInSearch: true,
    },
    {
      title: '调整周期',
      dataIndex: 'regulation_cycle',
      key: 'regulation_cycle',
      hideInSearch: true,
    },
    {
      title: '已进行天数',
      dataIndex: 'in_progress',
      key: 'in_progress',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <Space>
            <a
              onClick={() => {
                onReset();
                setIsEdit(true);
                handleSignatureModalVisible(true);
                setCurrentReward(record);
              }}
            >
              编辑
            </a>
            <Divider />
            <a onClick={() => deleteHandle(record)}>删除</a>
          </Space>
        );
      },
    },
  ];

  const addChildren = (
    <Fragment>
      <p>原调控周期：{currentReward?.regulation_cycle || 0} 天</p>
      <p>已进行：{currentReward?.in_progress || 0} 天</p>
      <p>本周期交易笔数：{currentReward?.transaction_count || 0} 次</p>
      <p>原单笔签名奖励：{currentReward?.sign_reward || 0} SIPC/次</p>
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

  const addColumns: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '发起链',
      fieldName: 'source_chain_id',
      isSelect: true,
      dataSource: chainList,
      needChange: true,
      handle: changeNode,
    },
    {
      formItemYype: 'select',
      formItemLabel: '目标链',
      fieldName: 'target_chain_id',
      isSelect: true,
      dataSource: chainList,
    },
  ];

  const updateColumns: FormPropsType[] = [
    {
      children: addChildren,
      renderInBefore: true,
    },
  ];

  const fourthFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'text',
      formItemLabel: isEdit ? '原单笔签名奖励更改为' : '单笔签名奖励',
      fieldName: 'sign_reward',
      suffix: 'SIPC/次',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '调控周期',
      fieldName: 'regulation_cycle',
      isSelect: false,
      suffix: '天',
      dataSource: [],
      children:
        '推荐公式：单笔签名奖励 = (锚定节点数 * 节点质押金额 * 质押年化率 * 调控周期天数) / (365 * 本周期交易数)，建议调控周期90天，到期后，若不修改，则自动续期。',
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<RewardListItem>
        headerTitle="签名奖励配置"
        actionRef={actionRef}
        rowKey="id"
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
          queryRewardConfigList({
            page_size: params.pageSize || 10,
            current_page: params.current || 1,
          })
        }
        search={false}
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
        onCancel={() => {
          setIsEdit(false);
          handleSignatureModalVisible(false);
        }}
        modalVisible={signatureModalVisible}
        modalTitle={isEdit ? '编辑奖励配置' : '新增奖励配置'}
        footer={footer}
      >
        <FormItem
          form={form}
          formPropsList={
            isEdit
              ? [...updateColumns, ...fourthFormPropsList]
              : [...addColumns, ...fourthFormPropsList]
          }
        >
          {/* {children} */}
        </FormItem>
      </CreateForm>
      <EstimateModal visible={estimateVisible} onCancel={cancleEstimate} />
    </PageHeaderWrapper>
  );
};

export default ConfigSignature;
