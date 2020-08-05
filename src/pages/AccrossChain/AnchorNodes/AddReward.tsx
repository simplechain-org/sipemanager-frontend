import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, message, Divider } from 'antd';
import React, { useState, useRef, Fragment, useEffect } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  queryReward,
  queryAnchorAll,
  rewardAdd,
  queryRewardTotal,
  queryRewardChain,
  querySignatureCount,
  queryNodeAll,
  queryWalletAll,
} from './service';
import FormItem from '../components/FormItem';
import { TableListItem, FormPropsType, NodeListItem, AnchorNodeItem } from './data';
import CreateForm from './components/CreateForm';

const AddReward = () => {
  const actionRef = useRef<ActionType>();
  const [provideModalVisible, handleProvideModalVisible] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState(0);
  const [nodeList, setNodeList] = useState([]);
  const [walletList, setWalletList] = useState([]);
  const [anchorList, setAnchorList] = useState([]);
  const [anchorEnum, setAnchorEnum] = useState({});
  const [currentNode, setCurrentNode] = useState<NodeListItem | undefined>(undefined);
  const [currentAnchorNode, setCurrentAnchorNode] = useState<AnchorNodeItem | undefined>(undefined);
  // 剩余奖池总额
  const [remianTotal, setRemainTotal] = useState(0);
  // 单笔签名奖励
  const [rewardChain, setRewardChain] = useState(0);
  // 总签名数、工作量占比
  const [signatureCount, setSignatureCount] = useState({ sign_count: '', rate: '' });
  // 建议单笔签名奖励
  const [singleReward, setSingleReward] = useState(0);
  const [form] = Form.useForm();
  const { validateFields, resetFields } = form;

  const resetPValue = () => {
    setRemainTotal(0);
    setRewardChain(0);
    setSignatureCount({ sign_count: '', rate: '' });
    setSingleReward(0);
    setCurrentNode(undefined);
    setCurrentAnchorNode(undefined);
  };

  const onReset = () => {
    resetFields();
    resetPValue();
  };

  const cancleHandle = () => {
    handleProvideModalVisible(false);
    // setCurrentNode(undefined);
    // setCurrentAnchorNode(undefined);
    resetPValue();
  };

  const addHandle = async (params: any) => {
    const res = await rewardAdd({ ...params, coin: currentNode?.coin_name });
    if (res.code === 0) {
      message.success('添加成功');
    }
    actionRef.current?.reload();
    cancleHandle();
    resetPValue();
  };
  const changeNode = (value: number) => {
    setCurrentNode(nodeList.filter((item: NodeListItem) => item.id === value)[0]);
  };

  const changeAnchorNode = (value: any) => {
    setCurrentAnchorNode(
      anchorList.filter((item: AnchorNodeItem) => item.id === parseInt(value, 10))[0],
    );
  };

  useEffect(() => {
    async function getOptions() {
      const res = await queryAnchorAll();
      const nodeRes = await queryNodeAll();
      const walletRes = await queryWalletAll();
      setAnchorList(
        res.data.map((item: AnchorNodeItem) => ({
          ...item,
          name: item.name,
        })),
      );
      setNodeList(nodeRes.data);
      setWalletList(walletRes.data);
      const enumMap = {};
      res.data.map((item: AnchorNodeItem) => {
        enumMap[item.id] = item.name;
        return false;
      });
      setAnchorEnum(enumMap);
    }
    getOptions();
  }, []);

  useEffect(() => {
    async function getRemain() {
      if (currentNode?.id && currentAnchorNode?.id) {
        const params = {
          anchor_node_id: currentAnchorNode.id,
          node_id: currentNode.id,
        };
        const res = await queryRewardTotal(params);
        setRemainTotal(res.data || 0);
        const rewardRes = await queryRewardChain(params);
        setRewardChain(rewardRes.data || 0);
        const sigRes = await querySignatureCount(params);
        setSignatureCount(sigRes.data || {});
        // const singleRewardRes = await queryRewardChain(params);
        setSingleReward(sigRes.data?.sign_count * rewardRes?.data || 0);
      }
    }
    getRemain();
  }, [currentNode?.id, currentAnchorNode?.id]);

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
      dataIndex: 'created_at',
      key: 'created_at',
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
      valueEnum: anchorEnum,
    },
    {
      title: '奖励池总额',
      dataIndex: 'total_reward',
      key: 'total_reward',
      hideInSearch: true,
    },
    {
      title: '签名量占比',
      dataIndex: 'rate',
      key: 'rate',
      hideInSearch: true,
    },
    {
      title: '奖励值',
      dataIndex: 'reward',
      key: 'reward',
      hideInSearch: true,
    },
    {
      title: '交易哈希',
      dataIndex: 'transaction_hash',
      key: 'transaction_hash',
      hideInForm: true,
      hideInSearch: true,
    },
  ];

  const addChildren = (
    <Fragment>
      <Divider />
      <p>剩余奖池总额：{`${remianTotal}SIPC`}</p>
      <p>单笔签名奖励：{`${rewardChain}SIPC/次`}</p>
      <p>本期总签名数：{`${signatureCount.sign_count || 0}次`}</p>
      <p>签名工作量占比：{signatureCount.rate || 0}</p>
      <p>奖励Token类型：{currentNode?.coin_name || 0}</p>
      <Divider />
    </Fragment>
  );

  const thirdFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'node_id',
      isSelect: true,
      dataSource: nodeList,
      needChange: true,
      handle: changeNode,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择锚定节点',
      fieldName: 'anchor_node_id',
      isSelect: true,
      dataSource: anchorList,
      children: addChildren,
      needChange: true,
      handle: changeAnchorNode,
    },
    {
      formItemYype: 'text',
      formItemLabel: '签名奖励值',
      fieldName: 'reward',
      isSelect: false,
      dataSource: [],
      extra: `本期建议奖励${singleReward}SIPC`,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择账户',
      fieldName: 'wallet_id',
      isSelect: false,
      dataSource: walletList,
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
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="签名奖励发放"
        actionRef={actionRef}
        rowKey="id"
        options={false}
        toolBarRender={() => [
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
            anchor_node_id: params.anchor_node_id || '',
          })
        }
        postData={(data: any) => {
          console.log('data-----', data.page_data);
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
        onCancel={cancleHandle}
        onReset={onReset}
        onClick={submitHandle}
        modalVisible={provideModalVisible}
        modalTitle="新增发放奖励"
      >
        <FormItem form={form} formPropsList={thirdFormPropsList} />
      </CreateForm>
    </PageHeaderWrapper>
  );
};

export default AddReward;
