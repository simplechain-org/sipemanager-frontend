import React from 'react';
import { Drawer, Button, Space } from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onClick: () => void;
  onReset: () => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onReset, onClick, onCancel } = props;

  return (
    <Drawer
      destroyOnClose
      title="注册新的跨链"
      width={720}
      visible={modalVisible}
      onClose={onCancel}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Space>
            <Button onClick={onReset}>重置</Button>
            <Button onClick={onClick} type="primary">
              确定
            </Button>
          </Space>
        </div>
      }
    >
      {props.children}
    </Drawer>
  );
};

export default CreateForm;
