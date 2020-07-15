import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Card, Select, Radio } from 'antd';
import { Chart, Legend, Axis, Tooltip, Geom } from 'bizcharts';
import { queryChainList } from '@/pages/Chain/ChainList/service';
import { queryFee } from '../service';

const Web3Utils = require('web3-utils');

console.log(Web3Utils);

const options = [
  { label: 'hour', value: 'hour' },
  { label: 'day', value: 'day' },
  { label: 'week', value: 'week' },
];

interface ChainItem {
  ID: number;
  name: string;
}

export default function PoundageCard() {
  const [loading] = useState(false);
  const [filterType, setFilterType] = useState<'hour' | 'day' | 'week'>('hour');
  const [chainList, setChainList] = useState<ChainItem[]>([]);
  const [curChain] = useState<undefined | number>();
  const [chartData, setChartData] = useState([]);

  const getFee = async () => {
    const res = await queryFee({
      startTime: '2020-06-10',
      endTime: '2020-07-14',
      chainId: 2,
      timeType: filterType,
    });
    console.log('444', res);
    setChartData(res.data);
  };

  const getChainList = async () => {
    const res = await queryChainList();
    // console.log(res.data, '3');
    setChainList(res.data || []);
  };

  useEffect(() => {
    getFee();
    getChainList();
  }, [filterType]);

  const onChange = (e: any) => {
    setFilterType(e.nativeEvent.target.value);
  };

  const cols = {
    date: {
      type: 'time',
      mask: filterType === 'hour' ? 'HH:mm' : 'MM-DD',
    },
    fee: {
      formatter: (value: number) => {
        console.log(value);
        return Web3Utils.fromWei(value.toString());
      },
    },
  };

  return (
    <Card
      loading={loading}
      bordered={false}
      extra={<Link to="/data-monitoring/poundage">详情</Link>}
      title={
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
            value={curChain}
          >
            {chainList.map((option) => (
              <Select.Option key={option.ID} value={option.ID}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </>
      }
    >
      <Radio.Group onChange={onChange} value={filterType}>
        {options.map((option) => (
          <Radio.Button key={option.value} value={option.value}>
            {option.label}
          </Radio.Button>
        ))}
      </Radio.Group>
      <Chart height={360} data={chartData} scale={cols} autoFit>
        <Legend
        // marker={{
        //   symbol: 'circle',
        //   style: {
        //     stroke: 'none',
        //   },
        // }}
        />
        <Axis name="date" />
        <Axis
          name="fee"
          label={{
            formatter: (val) => {
              // console.log(val);
              return val;
            },
          }}
        />
        <Tooltip showCrosshairs shared />
        <Geom type="line" position="date*fee" size={2} color="name" />
        <Geom
          type="point"
          position="date*fee"
          size={4}
          shape="circle"
          color="name"
          style={{
            stroke: '#fff',
            lineWidth: 1,
          }}
        />
      </Chart>
    </Card>
  );
}
