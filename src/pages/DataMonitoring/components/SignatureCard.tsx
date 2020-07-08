import React, { useState } from 'react';
import { Card, Select } from 'antd';
import { Chart, Legend, Axis, Tooltip, Geom } from 'bizcharts';

function TitleContent() {
  return (
    <>
      <span>签名监控</span>
      <Select
        style={{
          float: 'right',
          width: 180,
          marginRight: 16,
        }}
        size="small"
        placeholder="选择跨链对"
        allowClear
      >
        <Select.Option value="demo">Demo</Select.Option>
      </Select>
    </>
  );
}

export default function SignatureCard() {
  const [loading] = useState(false);

  const data = [
    {
      month: 'Jan',
      city: 'China',
      revenue: 7,
    },
    {
      month: 'Jan',
      city: 'Oversea',
      revenue: 3.9,
    },
    {
      month: 'Feb',
      city: 'China',
      revenue: 6.9,
    },
    {
      month: 'Feb',
      city: 'Oversea',
      revenue: 4.2,
    },
    {
      month: 'Mar',
      city: 'China',
      revenue: 9.5,
    },
    {
      month: 'Mar',
      city: 'Oversea',
      revenue: 5.7,
    },
    {
      month: 'Apr',
      city: 'China',
      revenue: 14.5,
    },
    {
      month: 'Apr',
      city: 'Oversea',
      revenue: 8.5,
    },
    {
      month: 'May',
      city: 'China',
      revenue: 18.4,
    },
    {
      month: 'May',
      city: 'Oversea',
      revenue: 11.9,
    },
    {
      month: 'Jun',
      city: 'China',
      revenue: 21.5,
    },
    {
      month: 'Jun',
      city: 'Oversea',
      revenue: 15.2,
    },
    {
      month: 'Jul',
      city: 'China',
      revenue: 25.2,
    },
    {
      month: 'Jul',
      city: 'Oversea',
      revenue: 17,
    },
    {
      month: 'Aug',
      city: 'China',
      revenue: 26.5,
    },
    {
      month: 'Aug',
      city: 'Oversea',
      revenue: 16.6,
    },
    {
      month: 'Sep',
      city: 'China',
      revenue: 23.3,
    },
    {
      month: 'Sep',
      city: 'Oversea',
      revenue: 14.2,
    },
    {
      month: 'Oct',
      city: 'China',
      revenue: 18.3,
    },
    {
      month: 'Oct',
      city: 'Oversea',
      revenue: 10.3,
    },
    {
      month: 'Nov',
      city: 'China',
      revenue: 13.9,
    },
    {
      month: 'Nov',
      city: 'Oversea',
      revenue: 6.6,
    },
    {
      month: 'Dec',
      city: 'China',
      revenue: 9.6,
    },
    {
      month: 'Dec',
      city: 'Oversea',
      revenue: 4.8,
    },
  ];
  const cols = {
    month: {
      range: [0, 1],
    },
    revenue: {
      max: 30,
    },
  };

  return (
    <Card loading={loading} bordered={false} title={<TitleContent />}>
      <div>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="revenue"
            label={{
              formatter: (val) => `${val}亿`,
            }}
          />
          <Tooltip showCrosshairs shared />
          <Geom type="line" position="month*revenue" size={2} color="city" />
          <Geom
            type="point"
            position="month*revenue"
            size={4}
            shape="circle"
            color="city"
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    </Card>
  );
}
