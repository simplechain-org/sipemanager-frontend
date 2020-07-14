import React from 'react';
import { Form, Input, Select } from 'antd';

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
          <Select>
            {item.dataSource.map((option) => (
              <Option value={option.value} key={option.value}>
                {option.label}
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
        <Form.Item
          key={item.formItemLabel}
          name={item.fieldName}
          label={item.formItemLabel}
          extra={item.extra || ''}
          rules={
            item.formItemYype === ''
              ? []
              : [{ required: true, message: `请输入${item.formItemLabel}！` }]
          }
        >
          {formType(item)}
        </Form.Item>
      ))}
    </Form>
  );
};

export default FormItem;
