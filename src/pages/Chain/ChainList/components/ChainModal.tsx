import React, { FC, useEffect } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { TableListItem } from '../data';

interface ChainModalProps {
  visible: boolean;
  current: Partial<TableListItem> | undefined;
  onSubmit: (values: TableListItem) => void;
  onCancel: () => void;
  contractList?: any;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
const RadioGroup = Radio.Group;

const ChainModal: FC<ChainModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, current, onCancel, onSubmit, contractList } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
      });
    }
  }, [current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as TableListItem);
    }
  };

  return (
    <Modal
      forceRender
      title={`${current ? '编辑' : '新增'}链`}
      width={640}
      bodyStyle={{ padding: '28px 0 0' }}
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="链的名称"
          rules={[{ required: true, message: '请输入链的名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="network_id"
          label="ChainId"
          rules={[
            {
              required: true,
              validator: (_, value) => {
                if (value === '') {
                  return Promise.reject(new Error('请输入链ID'));
                }
                if (Number.isNaN(parseInt(value, 10))) {
                  return Promise.reject(new Error('请输入数字类型的链ID'));
                }
                if (parseInt(value, 10) < 0) {
                  return Promise.reject(new Error('链ID须为整数'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          {current ? (
            <span>{form.getFieldValue('network_id')}</span>
          ) : (
            <Input
              placeholder="请输入"
              onChange={(e) => {
                if (e.target.value === '') {
                  return;
                }
                const newNumber = parseInt(e.target.value || '0', 10);
                if (Number.isNaN(newNumber)) {
                  return;
                }
                form.setFieldsValue({
                  network_id: newNumber,
                });
              }}
            />
          )}
        </Form.Item>
        <Form.Item
          name="coin_name"
          label="Token名称"
          rules={[{ required: true, message: '请输入Token名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="symbol"
          label="Token符号"
          rules={[{ required: true, message: '请输入Token符号' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        {current ? (
          <Form.Item name="contract_instance_id" label="设置跨链合约">
            <RadioGroup>
              {contractList.map((item: any) => (
                <Radio style={radioStyle} key={item.ID} value={item.ID}>
                  {item.address}
                </Radio>
              ))}
            </RadioGroup>
          </Form.Item>
        ) : null}
      </Form>
    </Modal>
  );
};

export default ChainModal;
