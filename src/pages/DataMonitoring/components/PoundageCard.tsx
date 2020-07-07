import React, { useState } from 'react';
import { Card } from 'antd';

export default function PoundageCard() {
  const [loading] = useState(false);

  return (
    <Card loading={loading} bordered={false} title="MakeFinish手续费监控">
      3333
    </Card>
  );
}
