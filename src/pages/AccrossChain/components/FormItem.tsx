import React from 'react';
import { Form, Input, Select } from 'antd';
// import { getRandomIP } from '@/utils/utils';

interface FormItemProps {
  formPropsList: Item[];
  form: any;
}

interface Item {
  formItemYype: string;
  formItemLabel: string;
  fieldName: string;
  isSelect: boolean;
  dataSource: any[];
  extra?: string;
  isTips?: boolean;
  handle?: (value: number) => Promise<void> | null | undefined | void;
  // handle?: any;
  needChange?: boolean;
  children?: React.ReactNode | undefined;
}

const { Option } = Select;

const FormItem: React.FC<FormItemProps> = (props) => {
  const { formPropsList, form } = props;

  const formType = (item: Item) => {
    switch (item.formItemYype) {
      case 'text':
        return <Input />;
      case 'password':
        return <Input type="password" autoComplete="new-password" />;
      case 'textarea':
        return <Input.TextArea />;
      case 'select':
        return (
          // <Select onChange={item.needChange ? ((value) => item.handle(value as number)) : () => {}}>
          <Select
            onChange={
              item.needChange
                ? (value) => (item.handle ? item.handle(value as number) : null)
                : () => {}
            }
          >
            {item.dataSource.map((option) => (
              <Option value={option.ID} key={`${option.ID}${option.name}`}>
                {option.name}
              </Option>
            ))}
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <Form form={form}>
      {formPropsList.map((item) => (
        <>
          {item.isTips && <span>{item.extra}</span>}
          <Form.Item
            key={item.formItemLabel}
            name={item.isTips ? undefined : item.fieldName}
            label={item.formItemLabel}
            // initialValue={item.fieldName.includes('address' || 'ip' || 'IP') ? getRandomIP() : ''}
            rules={
              item.formItemYype === ''
                ? []
                : [{ required: true, message: `请输入${item.formItemLabel}！` }]
            }
          >
            {formType(item)}
          </Form.Item>
          {item.children}
        </>
      ))}
    </Form>
  );
};

export default FormItem;
