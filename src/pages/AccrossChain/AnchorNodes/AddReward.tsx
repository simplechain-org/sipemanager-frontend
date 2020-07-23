import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, message, Divider } from 'antd';
import React, { useState, useRef, Fragment, useEffect } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  queryReward,
  rewardAdd,
  queryRewardTotal,
  queryRewardChain,
  querySignatureCount,
} from './service';
import FormItem from '../components/FormItem';
import { TableListItem, FormPropsType, NodeListItem, AnchorNodeItem } from './data';
import CreateForm from './components/CreateForm';

interface PropsType {
  publicList: any;
}

const AddReward = (props: PropsType) => {
  const actionRef = useRef<ActionType>();
  const [provideModalVisible, handleProvideModalVisible] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentNode, setCurrentNode] = useState<NodeListItem | undefined>(undefined);
  const [currentAnchorNode, setCurrentAnchorNode] = useState<AnchorNodeItem | undefined>(undefined);
  // 剩余奖池总额
  const [remianTotal, setRemainTotal] = useState(0);
  // 单笔签名奖励
  const [rewardChain, setRewardChain] = useState(0);
  // 总签名数、工作量占比
  const [signatureCount, setSignatureCount] = useState({ sign_count: '', rate: '' });
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
    handleProvideModalVisible(false);
    setCurrentNode(undefined);
    setCurrentAnchorNode(undefined);
    setRemainTotal(0);
    setRewardChain(0);
    setSignatureCount({ sign_count: '', rate: '' });
  };
  const changeNode = (value: number) => {
    console.log('node change', value);
    setCurrentNode(props.publicList.nodeList.filter((item: NodeListItem) => item.ID === value)[0]);
  };

  const changeAnchorNode = (value: number) => {
    console.log('anchor node change', value);
    setCurrentAnchorNode(
      props.publicList.anchorNodeList.filter((item: AnchorNodeItem) => item.ID === value)[0],
    );
  };

  useEffect(() => {
    async function getRemain() {
      if (currentNode?.ID && currentAnchorNode?.ID) {
        const params = {
          anchor_node_id: currentAnchorNode.ID,
          node_id: currentNode.ID,
        };
        const res = await queryRewardTotal(params);
        setRemainTotal(res.data || 0);
        const rewardRes = await queryRewardChain(params);
        setRewardChain(rewardRes.data || 0);
        const sigRes = await querySignatureCount(params);
        setSignatureCount(sigRes.data || {});
      }
    }
    getRemain();
  }, [currentNode, currentAnchorNode]);

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
      // valueEnum: props.publicList.anchorNodeList,
      valueEnum: {},
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

  const addChildren = (
    <Fragment>
      <Divider />
      <p>剩余奖池总额：{remianTotal}</p>
      <p>单笔签名奖励：{rewardChain}</p>
      <p>本期总签名数：{signatureCount.sign_count}</p>
      <p>签名工作量占比：{signatureCount.rate}</p>
      <Divider />
    </Fragment>
  );

  const thirdFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'node_id',
      isSelect: true,
      // dataSource: props.publicList.nodeList,
      dataSource: [],
      needChange: true,
      handle: changeNode,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择锚定节点',
      fieldName: 'anchor_node_id',
      isSelect: true,
      // dataSource: props.publicList.anchorNodeList,
      dataSource: [],
      children: addChildren,
      needChange: true,
      handle: changeAnchorNode,
    },
    {
      formItemYype: 'select',
      formItemLabel: '奖励Token类型',
      fieldName: 'coin',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '签名奖励值',
      fieldName: 'reward',
      isSelect: false,
      dataSource: [],
      extra: `本期建议奖励${'1.1111SIPC'}`,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择账户',
      fieldName: 'wallet_id',
      isSelect: false,
      // dataSource: props.publicList.wallestList,
      dataSource: [],
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
        rowKey="key"
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
    </PageHeaderWrapper>
  );
};

export default AddReward;
