import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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
  const [fileListMap, setFileListMap] = useState({});

  useEffect(() => {
    const enumObj = {};
    (formPropsList || []).forEach((item) => {
      if (item.formItemYype === 'upload') {
        enumObj[item.fieldName] = undefined;
      }
    });
    setFileListMap(enumObj);
  }, [formPropsList]);

  const uploadChange = (info: File, name: string) => {
    let newList = Array(info);
    newList = newList.slice(-1);
    setFileListMap(() => ({ ...fileListMap, [name]: newList }));
    return false;
  };

  const removeFiles = (file: any, name: string) => {
    const fileList = fileListMap[name] || [];
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileListMap({ ...fileListMap, [name]: newFileList });
  };

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
      case 'upload':
        return (
          <Upload
            key={item.fieldName}
            fileList={fileListMap[item.fieldName]}
            beforeUpload={(info) => uploadChange(info, item.fieldName)}
            onRemove={(info) => removeFiles(info, item.fieldName)}
          >
            <Button>
              <UploadOutlined /> 点击上传
            </Button>
          </Upload>
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
        case 'upload':
          return [{ required: true, message: `您还未上传${item.formItemLabel}` }];
        default:
      }
    }
    return false;
  };

  return (
    <Form form={form}>
      {formPropsList.map((item, index) => (
        <Form.Item
          key={`${item.formItemLabel}${item.fieldName}${index}`}
          name={item.fieldName}
          label={item.formItemLabel}
          extra={item.extra || ''}
          rules={checkRules(item) || []}
          // valuePropName={item.formItemYype === 'upload' ? 'file' : 'text'}
        >
          {formType(item)}
        </Form.Item>
      ))}
    </Form>
  );
};

export default FormItem;
