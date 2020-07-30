import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Card, Form, Select, Radio, Empty } from 'antd';
import { Chart, Legend, Axis, Tooltip, Geom } from 'bizcharts';
import { queryChainList } from '@/pages/Chain/ChainList/service';
import moment from 'moment';
import { queryFee } from '../service';
import { FeeChartParams, ChainItem } from '../data.d';

const options = [
  { label: 'hour', value: 'hour' },
  { label: 'day', value: 'day' },
  // { label: 'week', value: 'week' },
];

export default function PoundageCard() {
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'hour' | 'day' | 'week'>('hour');
  const [chainList, setChainList] = useState<ChainItem[]>([]);
  const [curChain, setCurChain] = useState<undefined | number>(undefined);
  const [chartData, setChartData] = useState([]);

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
        default:
          formatStr = 'YYYY-MM-DD';
          startTime = moment().subtract(7, 'days');
          break;
        // case 'week':
        // default:
        //   formatStr = 'YYYYww';
        //   startTime = moment().subtract(7, 'weeks');
        //   break;
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
      nice: true,
      // formatter: (value: number) => {
      //   console.log(value);
      //   return Web3Utils.fromWei(new BigNumber(value).toFixed());
      // },
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
        <Form.Item label="选择Token">
          <Select
            style={{
              width: 150,
            }}
            placeholder="选择Token"
            value={curChain}
            onChange={(value) => setCurChain(value)}
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
