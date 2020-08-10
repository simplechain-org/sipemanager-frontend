import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Card, Form, Select, Radio, Empty } from 'antd';
import { Chart, Legend, Axis, Tooltip, Geom } from 'bizcharts';
import { queryChainList } from '@/pages/Chain/ChainList/service';
import moment from 'moment';
import { queryFee } from '../service';
import { FeeChartParams, ChainItem } from '../data.d';

const Web3Utils = require('web3-utils');
const BigNumber = require('bignumber.js');

const options = [
  { label: 'hour', value: 'hour' },
  { label: 'day', value: 'day' },
  { label: 'week', value: 'week' },
];

export default function PoundageCard() {
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'hour' | 'day' | 'week'>('hour');
  const [chainList, setChainList] = useState<ChainItem[]>([]);
  const [curChain, setCurChain] = useState<undefined | number>(undefined);
  const [chartData, setChartData] = useState([]);
  const [coinName, setCoinName] = useState<undefined | string>('');

  const getFee = async (params: FeeChartParams) => {
    const res = await queryFee(params);
    setLoading(false);
    setChartData(res.data || []);
  };

  const getChainList = async () => {
    const res = await queryChainList();
    if (res.data && res.data.page_data) {
      setChainList(res.data.page_data);
      console.log(res.data.page_data[0].id);
      setCurChain(res.data.page_data.length ? res.data.page_data[0].id : undefined);
      setCoinName(res.data.page_data[0].coinName || '');
    }
  };

  useEffect(() => {
    if (curChain) {
      let startTime: any;
      let formatStr = '';
      switch (filterType) {
        case 'hour':
          formatStr = 'YYYY-MM-DD HH:mm:ss';
          startTime = moment().subtract(24, 'hours');
          break;
        case 'day':
        default:
          formatStr = 'YYYY-MM-DD';
          startTime = moment().subtract(7, 'days');
          break;
        case 'week':
          formatStr = 'YYYYww';
          startTime = moment().subtract(7, 'weeks');
          break;
      }
      getFee({
        startTime:
          filterType === 'hour'
            ? startTime.subtract(8, 'hours').format(formatStr)
            : startTime.format(formatStr),
        endTime:
          filterType === 'hour'
            ? moment().subtract(8, 'hours').format(formatStr)
            : moment().format(formatStr),
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
      formatter: (value: any) => {
        switch (filterType) {
          case 'hour':
            return moment(value).add(8, 'hours').format('HH:mm');
          case 'day':
            return moment(value).format('MM-DD');
          case 'week':
            return `第${moment(value).format('YYYYww').slice(4, 6)}周`;
          default:
            return '';
        }
      },
    },
    fee: {
      nice: true,
      formatter: (value: number) => {
        return Web3Utils.fromWei(new BigNumber(value).toFixed());
      },
      // alias: 'SIPC',
      alias: coinName,
    },
  };

  return (
    <Card
      loading={loading}
      bordered={false}
      extra={<Link to="/data-monitoring/poundage">详情</Link>}
      title="MakeFinish手续费监控"
    >
      <Form
        layout="inline"
        style={{
          marginBottom: 15,
        }}
      >
        <Form.Item label="选择链">
          <Select
            style={{
              width: 200,
            }}
            placeholder="选择链"
            value={curChain}
            onChange={(value) => {
              setCurChain(value);
              setCoinName(chainList.find((item) => item.id === value)?.coinName);
            }}
          >
            {chainList.map((option) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={{
            flex: 1,
            marginRight: 0,
          }}
        >
          <Radio.Group
            style={{
              float: 'right',
            }}
            onChange={onChange}
            value={filterType}
          >
            {options.map((option) => (
              <Radio.Button key={option.value} value={option.value}>
                {option.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      </Form>
      {chartData.length ? (
        <Chart height={360} data={chartData} scale={cols} autoFit>
          <Legend />
          <Axis name="date" />
          <Axis
            name="fee"
            title
            label={{
              formatter: (val) => {
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
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 360,
          }}
        >
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </Card>
  );
}
