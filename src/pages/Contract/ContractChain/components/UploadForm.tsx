import React from 'react';
import { Modal, Button } from 'antd';

import { TableListItem } from '../data';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UploadFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onReset: () => void;
  submitHandle: () => void;
}

export interface UploadFormState {
  formVals: FormValueType;
  currentStep: number;
}

const UploadForm: React.FC<UploadFormProps> = (props) => {
  const { modalVisible, onCancel, onReset, submitHandle } = props;

  return (
    <Modal
      destroyOnClose
      title="本地合约上链"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={
        <>
          <Button onClick={onReset}>重置</Button>
          <Button type="primary" onClick={submitHandle}>
            提交
          </Button>
        </>
      }
    >
      {props.children}
    </Modal>
  );
};

export default UploadForm;
