import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Form, Row, Col, Select } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import DetailsForm from './components/DetailsForm';
import { TableListItem } from './data';
import { queryRule, queryChain } from './service';

const RegistRecord: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [drawerVisible, handleDrawerVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentHandle] = useState(null);
  const [chainList, setChainList] = useState([]);
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  // 动态控制表单项，默认渲染两项，数组的元素无意义，只要长度为2即可
  const [list, setList] = useState<number[]>(Array.from({ length: 2 }));
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'textarea',
    },
    {
      title: '发起链',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: '目标链',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: '最低签名数',
      dataIndex: 'lowest',
      key: 'lowest',
    },
    {
      title: '锚定节点数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '注册TX哈希',
      dataIndex: 'tx_hash',
      key: 'tx_hash',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record: any) => (
        <>
          <a
            onClick={() => {
              setCurrentHandle(record);
              handleModalVisible(true);
              form.setFieldsValue(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleDrawerVisible(true)}>查看</a>
        </>
      ),
    },
  ];

  const onReset = () => {
    form.resetFields();
  };

  const btnBindHandle = (index: number) => {
    if (index === 0) {
      // 将新增表单项置空
      form.resetFields([
        [`${list.length}`, 'anchor_node_address'],
        [`${list.length}`, 'address'],
      ]);
      setList(Array.from({ length: list.length + 1 }));
      // form.setFieldsValue({
      //   [list.length]: {
      //     address: 'hhhh',
      //     anchor_node_address: 'iiii',
      //   },
      // });
    } else {
      // setList(Array.from({ length: list.length - 1 }));
      // 每次删除都是删除最后一项，手动反填
      const valuesList = {};
      for (let i = index + 1; i < list.length; i += 1) {
        valuesList[i - 1] = form.getFieldsValue([`${i}`])[i];
      }
      console.log(valuesList);
      list.splice(index, 1);
      setList(new Array(...list));
      for (let i = index; i < list.length; i += 1) {
        form.setFieldsValue({
          [i]: valuesList[i],
        });
      }
    }
  };

  const renderMoreForm = () => {
    return list.map((_, index) => (
      <Row gutter={16} key={index}>
        <Col span={10}>
          <Form.Item
            key={`anchor_node_${index + 1}`}
            label={`锚定节点地址${index + 1}`}
            name={[`${index}`, 'anchor_node_address']}
            rules={[{ required: true, message: `请输入锚定节点地址${index + 1}` }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            key={`address_node_${index + 1}`}
            label={`地址${index + 1}名称`}
            name={[`${index}`, 'address']}
            rules={[{ required: true, message: `请输入地址${index + 1}名称` }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Button onClick={() => btnBindHandle(index)} disabled={index === 1}>
          {index === 0 ? '增加' : '删除'}
        </Button>
      </Row>
    ));
  };

  const getChainList = async () => {
    const res = await queryChain();
    setChainList(res.data);
  };

  useEffect(() => {
    getChainList();
  }, []);

  const onSubmit = () => {
    const { validateFields } = form;
    validateFields()
      .then((values) => {
        console.log('表单校验通过啦~', values, currentRecord);
        handleModalVisible(false);
        setCurrentHandle(null);
      })
      .catch((errorInfo) => {
        console.log('校验出错~', errorInfo);
        console.log('构建参数', Object.keys(errorInfo.values));
      });
  };

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="跨链注册记录列表"
        actionRef={actionRef}
        rowKey="tx_hash"
        onChange={() => {}}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              setList(Array.from({ length: 2 }));
              onReset();
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        options={false}
        search={false}
        request={(params) => queryRule(params)}
        columns={columns}
      />
      <CreateForm
        onCancel={() => {
          handleModalVisible(false);
          setCurrentHandle(null);
        }}
        modalVisible={createModalVisible}
        onReset={onReset}
        onClick={onSubmit}
      >
        {/* <FormItem form={form} formPropsList={formPropsList} /> */}

        <Form form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="source_chain_id"
                label="链A"
                rules={[{ required: true, message: '请选择链A' }]}
              >
                <Select>
                  {chainList.map((item: any) => (
                    <Select.Option value={item.ID} key={item.ID}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="链A的节点"
                rules={[{ required: true, message: '请选择链A的节点' }]}
              >
                <Select>
                  <Select.Option value="1111">1111</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="target_chain_id"
                label="链B"
                rules={[{ required: true, message: '请选择链B' }]}
              >
                <Select>
                  {chainList.map((item: any) => (
                    <Select.Option value={item.ID} key={item.ID}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url_b"
                label="链B的节点"
                rules={[{ required: true, message: '请选择链B的节点' }]}
              >
                <Select>
                  <Select.Option value="1111">1111</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {renderMoreForm()}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="锚定节点质押金额"
                name="money"
                rules={[{ required: true, message: '请输入锚定节点质押金额' }]}
              >
                <Input suffix="SIPC" autoFocus />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="最低签名数"
                name="sign_confirm_count"
                rules={[
                  { required: true, message: '请输入最低签名数' },
                  () => ({
                    validator(rule, value) {
                      if (!value || Number(value) >= 2) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('最低签名数不可低于2'));
                    },
                  }),
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {!currentRecord ? (
            <>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="选择钱包账户"
                    name="wallet"
                    rules={[{ required: true, message: '请选择钱包账户' }]}
                  >
                    <Select>
                      <Select.Option value="1111">1111</Select.Option>
                      <Select.Option value="222">222</Select.Option>
                      <Select.Option value="333">333</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="钱包密码"
                    name="password"
                    rules={[{ required: true, message: '请输入钱包密码' }]}
                  >
                    <Input.Password autoComplete="new-password" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : null}
        </Form>
      </CreateForm>
      <DetailsForm
        drawerVisible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
        // detailData={currentRecord || {}}
        // form={form}
      />
    </PageHeaderWrapper>
  );
};

export default RegistRecord;
