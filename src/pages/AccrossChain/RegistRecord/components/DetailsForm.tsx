import React from 'react';
import { Drawer } from 'antd';
import FormItem from '../../components/FormItem';

interface DetailsFormProps {
  drawerVisible: boolean;
  onClose: () => void;
  // detailData: {};
  // form: {
  //   setFieldsValue: (arg: {}) => {};
  // };
}

interface FormPropsType {
  formItemYype: string;
  formItemLabel: string;
  fieldName: string;
  isSelect: boolean;
  dataSource: [];
  extra?: string;
}

const formPropsList: FormPropsType[] = [
  {
    formItemYype: '',
    formItemLabel: '注册时间',
    fieldName: 'createdTime',
    isSelect: false,
    dataSource: [],
  },
  {
    formItemYype: '',
    formItemLabel: '发起链',
    fieldName: 'origin_chain',
    isSelect: false,
    dataSource: [],
  },
  {
    formItemYype: '',
    formItemLabel: '目标链',
    fieldName: 'target_chain',
    isSelect: false,
    dataSource: [],
  },
  {
    formItemYype: '',
    formItemLabel: '最少签名数',
    fieldName: 'lowest',
    isSelect: false,
    dataSource: [],
  },
  {
    formItemYype: '',
    formItemLabel: '锚定节点1',
    fieldName: 'anchor_node_1',
    isSelect: false,
    dataSource: [],
  },
  {
    formItemYype: '',
    formItemLabel: '锚定节点2',
    fieldName: 'anchor_node_2',
    isSelect: false,
    dataSource: [],
  },
  {
    formItemYype: '',
    formItemLabel: '状态',
    fieldName: 'status',
    isSelect: false,
    dataSource: [],
  },
  {
    formItemYype: '',
    formItemLabel: 'TX哈希',
    fieldName: 'tx_hash',
    isSelect: false,
    dataSource: [],
  },
];

const DetailsForm: React.FC<DetailsFormProps> = (props) => {
  const { drawerVisible, onClose } = props;

  // form.setFieldsValue(detailData);

  return (
    <Drawer
      destroyOnClose
      title="链注册日志详情"
      width={720}
      visible={drawerVisible}
      onClose={onClose}
      footer={null}
    >
      <FormItem formPropsList={formPropsList} />
    </Drawer>
  );
};

export default DetailsForm;
