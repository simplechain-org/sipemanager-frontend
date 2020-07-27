import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'antd';
import FormItem from '../../components/FormItem';

interface PropsType {
  visible: boolean;
  onCancel: () => void;
}

function EstimateModal(props: PropsType) {
  const { visible, onCancel } = props;
  const [form] = Form.useForm();
  const [values, setValues] = useState({});
  const [result, setResult] = useState(0);

  const debounce = (fun: any, delay: number) => {
    let timer: any;
    return function (this: any, args: any) {
      const that = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fun.call(that, args);
      }, delay);
    };
  };

  const calculate = () => {
    const obj = form.getFieldsValue();
    if (Object.values(obj).includes(undefined)) {
      setResult(0);
    } else {
      const res =
        (((obj.anchor_count * obj.money * obj.rate) / 100) * obj.cycle) / (365 * obj.count);
      if (Number.isNaN(res) || res === undefined || res === Infinity) {
        setResult(0);
      } else {
        setResult(res);
      }
    }
    setValues(form.getFieldsValue());
  };

  const getResult = debounce(calculate, 2000);

  useEffect(() => {
    if (visible) {
      getResult(calculate);
    }
  }, [values, visible]);

  const rules = () => ({
    validator(_: any, value: any) {
      if (value >= 0) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('请输入数字'));
    },
  });

  const formPropsList = [
    {
      formItemYype: 'text',
      formItemLabel: '锚定节点数',
      fieldName: 'anchor_count',
      isSelect: false,
      dataSource: [],
      rules,
    },
    {
      formItemYype: 'text',
      formItemLabel: '节点质押金额',
      fieldName: 'money',
      suffix: 'SIPC',
      isSelect: false,
      dataSource: [],
      rules,
    },
    {
      formItemYype: 'text',
      formItemLabel: '质押年化率',
      fieldName: 'rate',
      suffix: '%',
      extra: '建议年化率10%',
      isSelect: false,
      dataSource: [],
      rules,
    },
    {
      formItemYype: 'text',
      formItemLabel: '调控周期天数',
      fieldName: 'cycle',
      suffix: '天',
      extra: '建议调控周期90天，到期后，若不修改，则自动续期',
      isSelect: false,
      dataSource: [],
      rules,
    },
    {
      formItemYype: 'text',
      formItemLabel: '预测周期交易数',
      fieldName: 'count',
      isSelect: false,
      dataSource: [],
      rules,
    },
  ];

  return (
    <Modal
      title="签名奖励估算计算器"
      visible={visible}
      onCancel={onCancel}
      footer={
        <>
          <Button type="primary" onClick={() => form.resetFields()}>
            重置
          </Button>
          <Button type="primary" onClick={onCancel}>
            关闭
          </Button>
        </>
      }
    >
      <Form.Item>
        签名奖励计算公式：单笔签名奖励 =（锚定节点数 * 节点质押金额 * 质押年化率 * 调控周期天数）/
        （365 * 本周期交易数）
      </Form.Item>
      <FormItem formPropsList={formPropsList} form={form} />
      <Form.Item label="单笔签名奖励">{result}SIPC/次</Form.Item>
    </Modal>
  );
}
export default EstimateModal;
