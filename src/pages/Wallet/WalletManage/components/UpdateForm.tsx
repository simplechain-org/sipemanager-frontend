import React from 'react';
import { Modal, Button } from 'antd';

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onReset: () => void;
  submitHandle: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { modalVisible, onCancel, onReset, submitHandle } = props;

  return (
    <Modal
      destroyOnClose
      title="修改钱包密码"
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

export default UpdateForm;
