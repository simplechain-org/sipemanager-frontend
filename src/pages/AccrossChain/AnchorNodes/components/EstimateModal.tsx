import React from 'react';
import { Modal, Button, Form } from 'antd';
import FormItem from '../../components/FormItem';

interface PropsType {
  visible: boolean;
  onCancel: () => void;
}
function EstimateModal(props: PropsType) {
  const { visible, onCancel } = props;
  const [form] = Form.useForm();

  const formPropsList = [
    {
      formItemYype: 'text',
      formItemLabel: '锚定节点数',
      fieldName: 'anchor_count',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '节点质押金额',
      fieldName: 'money',
      suffix: 'SIPC',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '质押年化率',
      fieldName: 'rate',
      suffix: '%',
      extra: '建议年化率10%',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '调控周期天数',
      fieldName: 'rate',
      suffix: '天',
      extra: '建议调控周期90天，到期后，若不修改，则自动续期',
      isSelect: false,
      dataSource: [],
    },
    {
      formItemYype: 'text',
      formItemLabel: '预测周期交易数',
      fieldName: 'rate',
      isSelect: false,
      dataSource: [],
    },
  ];

  return (
    <Modal
      title="签名奖励估算计算器"
      visible={visible}
      onCancel={onCancel}
      footer={
        <Button type="primary" onClick={onCancel}>
          关闭
        </Button>
      }
    >
      <Form.Item>
        签名奖励计算公式：单笔签名奖励 =（锚定节点数 * 节点质押金额 * 质押年化率 * 调控周期天数）/
        （365 * 本周期交易数）
      </Form.Item>
      <FormItem formPropsList={formPropsList} form={form} />
      <Form.Item label="单笔签名奖励">{0.12345678}SIPC/次</Form.Item>
    </Modal>
  );
}
export default EstimateModal;
