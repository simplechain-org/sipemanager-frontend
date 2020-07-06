import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Tabs, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateForm from './components/CreateForm';
import { TableListItem } from './data';
import { queryRule } from './service';
import FormItem from '../components/FormItem';

interface FormPropsType {
  formItemYype: string;
  formItemLabel: string;
  fieldName: string;
  isSelect: boolean;
  dataSource: [];
  extra?: string;
}

const { TabPane } = Tabs;
const AnchorNode: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, handleDeleteModalVisible] = useState<boolean>(false);
  const [feeModalVisible, handleFeeModalVisible] = useState<boolean>(false);
  const [provideModalVisible, handleProvideModalVisible] = useState<boolean>(false);
  const [signatureModalVisible, handleSignatureModalVisible] = useState<boolean>(false);
  const [punishModalVisible, handlePunishModalVisible] = useState<boolean>(false);
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const actionRef = useRef<ActionType>();

  const addBtnHandle = (visibleType: string) => {
    switch (visibleType) {
      case 'anchorNode':
        handleModalVisible(true);
        break;
      case 'fee':
        handleFeeModalVisible(true);
        break;
      case 'addReward':
        handleProvideModalVisible(true);
        break;
      case 'configure':
        handleSignatureModalVisible(true);
        break;
      case 'punish':
        handlePunishModalVisible(true);
        break;
      default:
    }
  };

  const deleteModal = () => {
    console.log('删除锚定节点');
    handleDeleteModalVisible(true);
  };

  // const tabsList = [
  //   {
  //     tabName: '锚定节点列表',
  //     tableName: '锚定节点列表',
  //     btnList: [{ title: '新增', handle: addHandle }],
  //     haveDrawer: true,
  //     modalTitle: '新增锚定节点',
  //   },
  //   {
  //     tabName: '手续费报销',
  //     tableName: '手续费列表',
  //     btnList: [{ title: '报销手续费', handle: addHandle }],
  //     haveDrawer: false,
  //     modalTitle: '新增手续费报销',
  //   },
  //   {
  //     tabName: '签名奖励',
  //     tableName: '签名奖励列表',
  //     btnList: [
  //       { title: '配置签名奖励', handle: editHandle },
  //       { title: '新增发放奖励', handle: addHandle },
  //     ],
  //     haveDrawer: false,
  //     modalTitle: '新增发放奖励',
  //     editModalTitle: '配置签名奖励',
  //   },
  //   {
  //     tabName: '惩罚管理',
  //     tableName: '惩罚管理列表',
  //     btnList: [{ title: '管理锚定节点', handle: addHandle }],
  //     haveDrawer: false,
  //     modalTitle: '管理锚定节点',
  //   },
  // ];

  const formPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '链A',
      fieldName: 'chain_a',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '链A的节点',
      fieldName: 'chain_a_node',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '链B',
      fieldName: 'chain_b',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '链B的节点',
      fieldName: 'chain_b_node',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '锚定节点名称',
      fieldName: 'name',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '锚定节点地址',
      fieldName: 'address',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择钱包账户',
      fieldName: 'wallet',
      isSelect: false,
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

  const secondFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'chain_a',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择锚定节点',
      fieldName: 'chain_a_node',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: 'Token类型',
      fieldName: 'chain_b',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '累计消耗手续费',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '累计已报销手续费',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '本期应报销手续费',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择账户',
      fieldName: 'wallet',
      isSelect: false,
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

  const thirdFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'chain_a',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择锚定节点',
      fieldName: 'chain_a_node',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '剩余奖池总额',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '单笔签名奖励',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '本期总签名数',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '签名工作量占比',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
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

  const fourthFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'chain_a',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '锚定节点数',
      fieldName: 'chain_a_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '本周期交易数',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '原签名奖励',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
      extra:
        '建议奖励签名计算公式：单笔签名奖励 =（锚定节点数 * 节点质押金额 * 质押年化率 * 调控周期天数）/ （365 * 本周期交易数），其中质押年化率建议10%，调控天数建议90天，规则管理员可根据实际情况自行调整。',
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

  const fiftyFormPropsList: FormPropsType[] = [
    {
      formItemYype: 'select',
      formItemLabel: '选择节点',
      fieldName: 'chain_a',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择锚定节点',
      fieldName: 'chain_a',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '管理类型',
      fieldName: 'chain_b_node',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: 'Token类型',
      fieldName: 'chain_b',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '扣减数量',
      fieldName: 'chain_b_node',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择账户',
      fieldName: 'wallet',
      isSelect: false,
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

  const deleteFormPropsList: FormPropsType[] = [
    {
      formItemYype: '',
      formItemLabel: '',
      fieldName: 'chain_a',
      isSelect: false,
      dataSource: [],
      extra: '删除后，将从区块链上移除该锚定节点的签名资格，请再次确定是否要删除锚定节点。',
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择链A节点',
      fieldName: 'chain_a',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择链B节点',
      fieldName: 'chain_a',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'select',
      formItemLabel: '选择账户',
      fieldName: 'chain_a',
      isSelect: true,
      dataSource: [],
    },
    {
      formItemYype: 'password',
      formItemLabel: '钱包密码',
      fieldName: 'chain_a',
      isSelect: false,
      dataSource: [],
    },
  ];

  const detailFormPropsList: FormPropsType[] = [
    {
      formItemYype: '',
      formItemLabel: '链A',
      fieldName: 'chain_a',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '链A的节点',
      fieldName: 'chain_a_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '链B',
      fieldName: 'chain_b',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '链B的节点',
      fieldName: 'chain_b_node',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '锚定节点名称',
      fieldName: 'name',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: '',
      formItemLabel: '锚定节点地址',
      fieldName: 'address',
      isSelect: false,
      dataSource: [],
    },
  ];

  const firstColumns: ProColumns<TableListItem>[] = [
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '锚定节点名称',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '锚定节点',
      dataIndex: 'createdAt',
      key: 'createdAt',
      hideInTable: true,
      valueEnum: {},
    },
    {
      title: '归属链A',
      dataIndex: 'chain_a',
      key: 'chain_a',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '归属链B',
      dataIndex: 'chain_b',
      key: 'chain_b',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: 'makefinish手续费',
      dataIndex: 'makefinish',
      key: 'makefinish',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '已报销手续费',
      dataIndex: 'haved_fee',
      key: 'haved_fee',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '累计有效签名数',
      dataIndex: 'total',
      key: 'total',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '累计发放奖励',
      dataIndex: 'total_money',
      key: 'total_money',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '质押金额',
      dataIndex: 'money',
      key: 'money',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '身份状态',
      dataIndex: 'status',
      key: 'status',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => (
        <>
          <a
            onClick={() => {
              handleDrawerVisible(true);
            }}
          >
            查看
          </a>
          {/* <Divider type="vertical" />
          <a onClick={() => {}}>部署</a> */}
          <Divider type="vertical" />
          <a onClick={deleteModal}>删除</a>
        </>
      ),
    },
  ];

  const secondColumns: ProColumns<TableListItem>[] = [
    {
      title: '报销时间',
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
      dataIndex: 'anchor_node',
      key: 'anchor_node',
      hideInTable: true,
      valueEnum: {},
    },
    {
      title: '交易哈希',
      dataIndex: 'tx_hash',
      key: 'tx_hash',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '报销手续费',
      dataIndex: 'haved_fee',
      key: 'haved_fee',
      hideInSearch: true,
      hideInForm: true,
    },
  ];

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
      dataIndex: 'anchor_node',
      key: 'anchor_node',
      hideInTable: true,
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

  const fourthColumns: ProColumns<TableListItem>[] = [
    {
      title: '时间',
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
      dataIndex: 'anchor_node',
      key: 'anchor_node',
      hideInTable: true,
      valueEnum: {},
    },
    {
      title: '管理类型',
      dataIndex: 'total',
      key: 'total',
      hideInSearch: true,
    },
    {
      title: '数值',
      dataIndex: 'percent',
      key: 'percent',
      hideInSearch: true,
    },
  ];

  // const tabChange = (key: string): any => {
  //   switch (key) {
  //     case '0':
  //       return firstColumns;
  //     case '1':
  //       return secondColumns;
  //     case '2':
  //       return thirdColumns;
  //     case '3':
  //       return fourthColumns;
  //     default:
  //   }
  // };

  const [form] = Form.useForm();
  const { validateFields } = form;

  const onReset = () => {
    form.resetFields();
  };

  const submitHandle = () => {
    console.log('新增锚定节点');
    validateFields()
      .then((values) => {
        console.log('表单校验通过啦~', values);
      })
      .catch((errorInfo) => {
        console.log('校验出错~', errorInfo);
      });
  };

  return (
    <PageHeaderWrapper>
      <Tabs defaultActiveKey="0">
        {/* {tabsList.map((item, index) => (
          <TabPane tab={item.tabName} key={index}>
            <ProTable<TableListItem>
              headerTitle={item.tableName}
              actionRef={actionRef}
              rowKey="key"
              options={false}
              onChange={(_, _filter, _sorter) => {
                const sorterResult = _sorter as SorterResult<TableListItem>;
                if (sorterResult.field) {
                  setSorter(`${sorterResult.field}_${sorterResult.order}`);
                }
              }}
              params={{
                sorter,
              }}
              toolBarRender={() => [
                <Space>
                  {item.btnList.map((btnEle) => (
                    <Button type="primary" onClick={btnEle.handle} key={btnEle.title}>
                      <PlusOutlined /> {btnEle.title}
                    </Button>
                  ))}
                </Space>,
              ]}
              request={(params) => queryRule(params)}
              columns={tabChange(`${index}`)}
            />
            <CreateForm
              onCancel={() => handleModalVisible(false)}
              onReset={onReset}
              onClick={submitHandle}
              modalVisible={createModalVisible}
              modalTitle={item.modalTitle}
              key={item.modalTitle}
            >
              <FormItem form={form} formPropsList={formPropsList} />
            </CreateForm>
            {item.haveDrawer ? (
              <Drawer
                title="详细信息"
                width={450}
                onClose={() => handleDrawerVisible(false)}
                visible={drawerVisible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <Button onClick={() => handleDrawerVisible(false)} style={{ marginRight: 8 }}>
                      取消
                    </Button>
                    <Button onClick={() => {}} type="primary">
                      确定
                    </Button>
                  </div>
                }
              >
                <>hhh</>
              </Drawer>
            ) : null}
          </TabPane> 
        ))}   */}

        <TabPane tab="锚定节点管理" key="0">
          <ProTable<TableListItem>
            headerTitle="锚定节点列表"
            actionRef={actionRef}
            rowKey="key"
            options={false}
            onChange={(_, _filter, _sorter) => {
              const sorterResult = _sorter as SorterResult<TableListItem>;
              if (sorterResult.field) {
                setSorter(`${sorterResult.field}_${sorterResult.order}`);
              }
            }}
            params={{
              sorter,
            }}
            toolBarRender={() => [
              <Button type="primary" onClick={() => addBtnHandle('anchorNode')}>
                <PlusOutlined /> 新增
              </Button>,
            ]}
            request={(params) => queryRule(params)}
            columns={firstColumns}
          />
          <CreateForm
            onCancel={() => handleDeleteModalVisible(false)}
            onReset={onReset}
            onClick={submitHandle}
            modalVisible={deleteModalVisible}
            modalTitle="删除锚定节点"
          >
            <FormItem form={form} formPropsList={deleteFormPropsList} />
          </CreateForm>
          <CreateForm
            onCancel={() => handleModalVisible(false)}
            onReset={onReset}
            onClick={submitHandle}
            modalVisible={createModalVisible}
            modalTitle="新增锚定节点"
          >
            <FormItem form={form} formPropsList={formPropsList} />
          </CreateForm>
          <Drawer
            title="详细信息"
            width={450}
            onClose={() => handleDrawerVisible(false)}
            visible={drawerVisible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={() => handleDrawerVisible(false)} style={{ marginRight: 8 }}>
                  取消
                </Button>
                <Button onClick={() => {}} type="primary">
                  确定
                </Button>
              </div>
            }
          >
            <FormItem form={form} formPropsList={detailFormPropsList} />
          </Drawer>
        </TabPane>

        <TabPane tab="手续费报销" key="1">
          <ProTable<TableListItem>
            headerTitle="手续费列表"
            actionRef={actionRef}
            rowKey="key"
            options={false}
            onChange={(_, _filter, _sorter) => {
              const sorterResult = _sorter as SorterResult<TableListItem>;
              if (sorterResult.field) {
                setSorter(`${sorterResult.field}_${sorterResult.order}`);
              }
            }}
            params={{
              sorter,
            }}
            toolBarRender={() => [
              <Button type="primary" onClick={() => addBtnHandle('fee')}>
                <PlusOutlined /> 报销手续费
              </Button>,
            ]}
            request={(params) => queryRule(params)}
            columns={secondColumns}
          />
          <CreateForm
            onCancel={() => handleFeeModalVisible(false)}
            onReset={onReset}
            onClick={submitHandle}
            modalVisible={feeModalVisible}
            modalTitle="报销手续费"
          >
            <FormItem form={form} formPropsList={secondFormPropsList} />
          </CreateForm>
        </TabPane>

        <TabPane tab="签名奖励" key="2">
          <ProTable<TableListItem>
            headerTitle="签名奖励列表"
            actionRef={actionRef}
            rowKey="key"
            options={false}
            onChange={(_, _filter, _sorter) => {
              const sorterResult = _sorter as SorterResult<TableListItem>;
              if (sorterResult.field) {
                setSorter(`${sorterResult.field}_${sorterResult.order}`);
              }
            }}
            params={{
              sorter,
            }}
            toolBarRender={() => [
              <Button type="primary" onClick={() => addBtnHandle('configure')}>
                <PlusOutlined /> 配置签名奖励
              </Button>,
              <Button type="primary" onClick={() => addBtnHandle('addReward')}>
                <PlusOutlined /> 新增发放奖励
              </Button>,
            ]}
            request={(params) => queryRule(params)}
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
            <FormItem form={form} formPropsList={fourthFormPropsList} />
          </CreateForm>
        </TabPane>

        <TabPane tab="惩罚管理" key="3">
          <ProTable<TableListItem>
            headerTitle="惩罚管理列表"
            actionRef={actionRef}
            rowKey="key"
            options={false}
            onChange={(_, _filter, _sorter) => {
              const sorterResult = _sorter as SorterResult<TableListItem>;
              if (sorterResult.field) {
                setSorter(`${sorterResult.field}_${sorterResult.order}`);
              }
            }}
            params={{
              sorter,
            }}
            toolBarRender={() => [
              <Button type="primary" onClick={() => addBtnHandle('punish')}>
                <PlusOutlined /> 管理锚定节点
              </Button>,
            ]}
            request={(params) => queryRule(params)}
            columns={fourthColumns}
          />
          <CreateForm
            onCancel={() => handlePunishModalVisible(false)}
            onReset={onReset}
            onClick={submitHandle}
            modalVisible={punishModalVisible}
            modalTitle="管理锚定节点"
          >
            <FormItem form={form} formPropsList={fiftyFormPropsList} />
          </CreateForm>
        </TabPane>
      </Tabs>
    </PageHeaderWrapper>
  );
};

export default AnchorNode;
