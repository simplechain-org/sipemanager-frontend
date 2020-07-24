import React, { Fragment } from 'react';
import { Form, Input, Select } from 'antd';

interface FormItemProps {
  formPropsList: Item[];
  form: any;
}

interface Item {
  formItemYype: string;
  suffix?: string;
  formItemLabel: string;
  fieldName: string;
  isSelect: boolean;
  dataSource: any[];
  extra?: string;
  // isTips?: boolean;
  handle?: (value: number) => Promise<void> | null | undefined | void;
  // handle?: any;
  needChange?: boolean;
  children?: React.ReactNode | undefined;
  rules?: any;
}

const { Option } = Select;

const FormItem: React.FC<FormItemProps> = (props) => {
  const { formPropsList, form } = props;

  const formType = (item: Item) => {
    switch (item.formItemYype) {
      case 'text':
        return <Input suffix={item?.suffix} />;
      case 'password':
        return <Input type="password" autoComplete="new-password" />;
      case 'textarea':
        return <Input.TextArea />;
      case 'select':
        return (
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
        <Fragment key={`${item.formItemLabel}${item.fieldName}${item.formItemYype}`}>
          {/* {item.isTips && <span>{item.extra}</span>} */}
          <Form.Item
            name={item.fieldName}
            label={item.formItemLabel}
            extra={item.extra}
            rules={
              item.formItemYype === ''
                ? []
                : [{ required: true, message: `请输入${item.formItemLabel}！` }]
            }
          >
            {formType(item)}
          </Form.Item>
          {item.children}
        </Fragment>
      ))}
    </Form>
  );
};

export default FormItem;
