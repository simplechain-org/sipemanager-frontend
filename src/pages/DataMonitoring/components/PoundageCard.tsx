import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Card, Select, Radio } from 'antd';
import { Chart, Legend, Axis, Tooltip, Geom } from 'bizcharts';
import { queryChainList } from '@/pages/Chain/ChainList/service';
import moment from 'moment';
import { queryFee } from '../service';
import { FeeChartParams } from '../data.d';

const Web3Utils = require('web3-utils');

console.log(moment().subtract(24, 'hours').format('YYYY-MM-DD hh:mm:ss'));

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
  const [curChain, setCurChain] = useState<undefined | number>(undefined);
  const [chartData, setChartData] = useState([]);

  const getFee = async (params: FeeChartParams) => {
    const res = await queryFee(params);
    console.log('fee', res);
    setChartData(res.data);
  };

  const getChainList = async () => {
    const res = await queryChainList();
    if (res.data && res.data.page_data) {
      setChainList(res.data.page_data);
      setCurChain(res.data.page_data[0].ID);
    }
  };

  useEffect(() => {
    if (curChain) {
      let startTime: any;
      let formatStr = '';
      switch (filterType) {
        case 'hour':
          formatStr = 'YYYY-MM-DD hh:mm:ss';
          startTime = moment().subtract(24, 'hours');
          break;
        case 'day':
          formatStr = 'YYYY-MM-DD';
          startTime = moment().subtract(7, 'days');
          break;
        case 'week':
        default:
          formatStr = 'YYYYww';
          startTime = moment().subtract(7, 'weeks');
          break;
      }
      getFee({
        startTime: startTime.format(formatStr),
        endTime: moment().format(formatStr),
        chainId: curChain,
        timeType: filterType,
      });
    }
  }, [filterType, curChain]);

  useEffect(() => {
    getChainList();
  }, []);

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
        // console.log(value);
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
            onChange={(value) => setCurChain(value)}
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
