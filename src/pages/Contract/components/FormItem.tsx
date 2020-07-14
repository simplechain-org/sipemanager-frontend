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
  isRequire: boolean;
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
        return <Input.Password autoComplete="new-password" />;
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

  const checkRules = (item: Item) => {
    if (item.isRequire) {
      switch (item.formItemYype) {
        case '':
          return [];
        case 'text':
          return [{ required: true, message: `请输入${item.formItemLabel}！` }];
        case 'textarea':
          return [{ required: true, message: `请输入${item.formItemLabel}！` }];
        case 'password':
          return [{ required: true, message: `请输入${item.formItemLabel}！` }];
        case 'select':
          return [{ required: true, message: `请选择${item.formItemLabel}！` }];
        default:
      }
    }
    return false;
  };

  return (
    <Form form={form}>
      {formPropsList.map((item) => (
        <Form.Item
          key={item.formItemLabel}
          name={item.fieldName}
          label={item.formItemLabel}
          extra={item.extra || ''}
          rules={checkRules(item) || []}
        >
          {formType(item)}
        </Form.Item>
      ))}
    </Form>
  );
};

export default FormItem;
