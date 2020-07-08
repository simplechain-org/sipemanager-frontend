import React, { useState } from 'react';
import { Link } from 'umi';
import { Card, Select } from 'antd';

function TitleContent() {
  return (
    <>
      <span>MakeFinish手续费监控</span>
      <Select
        style={{
          float: 'right',
          width: 180,
          marginRight: 16,
        }}
        size="small"
        placeholder="选择Token"
        allowClear
      >
        <Select.Option value="demo">Demo</Select.Option>
      </Select>
    </>
  );
}

export default function PoundageCard() {
  const [loading] = useState(false);

  return (
    <Card
      loading={loading}
      bordered={false}
      extra={<Link to="/data-monitoring/poundage">详情</Link>}
      title={<TitleContent />}
    >
      3333
    </Card>
  );
}
