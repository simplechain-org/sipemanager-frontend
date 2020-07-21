import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, message, Divider } from 'antd';
import React, { useState, useRef, useEffect, Fragment } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { queryFee, addFee, queryChargeFee } from './service';
import FormItem from '../components/FormItem';
import { FeeTableListItem, FormPropsType, FeeCollectionType, NodeListItem } from './data';
import CreateForm from './components/CreateForm';

interface PropsType {
  publicList: any;
}
const Fee = (props: PropsType) => {
  const actionRef = useRef<ActionType>();
  const [feeModalVisible, handleFeeModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [pageCount, setPageCount] = useState(0);
  const { validateFields, resetFields } = form;
  const [coinName, setCurrentCoin] = useState<string>('');
  const [node, setNode] = useState<{ node_id: undefined | number; coin: undefined | string }>({
    node_id: undefined,
    coin: undefined,
  });
  const [anchorNodeId, setAnchorId] = useState<number | undefined>(undefined);
  const [feeCollection, setFeeCollection] = useState<FeeCollectionType | null>(null);

  const onReset = () => {
    resetFields();
  };

  const addHandle = async (params: any) => {
    // const res = await addFee({...params,coin: coinName,fee: feeCollection?.reimbursed_fee});
    const res = await addFee({
      anchor_node_id: params.anchor_node_id,
      coin: coinName,
      fee: `${feeCollection?.reimbursed_fee}`,
      node_id: params.node_id,
      password: params.password,
      wallet_id: params.wallet_id,
    });
    if (res.code === 0) {
      message.success('添加成功');
    } else {
      message.error(res.msg || '添加失败');
    }
    handleFeeModalVisible(false);
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

  const setCurrentNode = (value: number) => {
    setNode({
      node_id: value,
      coin: props.publicList.nodeList.filter((item: NodeListItem) => item.ID === value)[0]
        .coin_name,
    });
    setCurrentCoin(
      props.publicList.nodeList.filter((item: NodeListItem) => item.ID === value)[0].coin_name ||
        '',
    );
  };

  const setCurrentAnchor = (value: number) => {
    setAnchorId(value);
  };

  useEffect(() => {
    async function fetchData() {
      if (anchorNodeId && node.node_id) {
        const res = await queryChargeFee({
          anchor_node_id: Number(anchorNodeId),
          node_id: Number(node.node_id),
          coin: node.coin,
        });
        setFeeCollection(res.data);
      }
    }
    fetchData();
  }, [anchorNodeId, node.node_id]);

  const secondColumns: ProColumns<FeeTableListItem>[] = [
    {
      title: '报销时间',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '锚定节点名称',
      dataIndex: 'anchorNodeName',
      key: 'anchorNodeName',
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
      title: '交易哈希',
      dataIndex: 'transactionHash',
      key: 'transactionHash',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '报销手续费',
      dataIndex: 'fee',
      key: 'fee',
      hideInSearch: true,
      hideInForm: true,
    },
  ];

  const children = (
    <Fragment>
      <Divider />
      <p>Token类型：{coinName}</p>
      <p>累计消耗手续费：{feeCollection?.accumulated_fee}</p>
      <p>累计已报销手续费：{feeCollection?.current_fee}</p>
      <p>本期应报销手续费：{feeCollection?.reimbursed_fee}</p>
      <Divider />
    </Fragment>
  );

  const secondFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'node_id',
      isSelect: true,
      dataSource: props.publicList.nodeList,
      handle: setCurrentNode,
      needChange: true,
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择锚定节点',
      fieldName: 'anchor_node_id',
      isSelect: true,
      dataSource: props.publicList.anchorNodeList,
      handle: setCurrentAnchor,
      children,
      needChange: true,
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
      <ProTable<FeeTableListItem>
        headerTitle="手续费列表"
        actionRef={actionRef}
        rowKey="key"
        options={false}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              onReset();
              handleFeeModalVisible(true);
            }}
          >
            <PlusOutlined /> 报销手续费
          </Button>,
        ]}
        request={(params: any) => {
          return queryFee({
            page_size: params.pageSize || 10,
            current_page: params.current || 1,
            anchor_node_id: props.publicList.anchorNodeList[params.anchor_node_id].ID,
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
        columns={secondColumns}
      />
      <CreateForm
        onCancel={() => handleFeeModalVisible(false)}
        onReset={onReset}
        onClick={submitHandle}
        modalVisible={feeModalVisible}
        modalTitle="报销手续费"
      >
        <FormItem form={form} formPropsList={secondFormPropsList}>
          {children}
        </FormItem>
      </CreateForm>
    </>
  );
};

export default Fee;
