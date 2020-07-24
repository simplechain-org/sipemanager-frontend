import React from 'react';
import { Modal, Button } from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onReset: () => void;
  submitHandle: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onReset, submitHandle } = props;

  return (
    <Modal
      destroyOnClose
      title="新增钱包账户"
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

export default CreateForm;
