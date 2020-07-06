import React from 'react';
import { Modal, Button } from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  modalTitle: string;
  onCancel: () => void;
  onReset: () => void;
  onClick: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, modalTitle, onCancel, onReset, onClick } = props;

  return (
    <Modal
      destroyOnClose
      title={modalTitle}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={
        <>
          <Button onClick={onReset}>重置</Button>
          <Button type="primary" onClick={onClick}>
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
