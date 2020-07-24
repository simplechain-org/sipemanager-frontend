import React, { useState, useEffect } from 'react';
import { Card, Select, Radio, Form, Empty } from 'antd';
import { Chart, Legend, Axis, Tooltip, Geom } from 'bizcharts';
import moment from 'moment';
import { querySignature } from '../service';
import { SignatureProps, SignatureChartParams } from '../data.d';

const options = [
  { label: 'hour', value: 'hour' },
  { label: 'day', value: 'day' },
];

export default function SignatureCard(props: SignatureProps) {
  const { data } = props;
  const [loading, setLoading] = useState(false);
  const [curCrossChain, setCurCrossChain] = useState<undefined | string>(undefined);
  const [filterType, setFilterType] = useState<'hour' | 'day' | 'week'>('hour');
  const [chartData, setChartData] = useState([]);

  const cols = {
    Date: {
      type: 'time',
      mask: filterType === 'hour' ? 'HH:mm' : 'MM-DD',
    },
    Count: {
      nice: true,
      // formatter: (value: number) => {
      //   // console.log(value);
      //   return Web3Utils.fromWei(value.toString());
      // },
    },
  };

  const getChartData = async (params: SignatureChartParams) => {
    const res = await querySignature(params);
    console.log('55', res.data);
    setLoading(false);
    let chartArr: any = [];
    Object.keys(res.data || {}).forEach((key: any) => {
      chartArr = [
        ...chartArr,
        ...res.data[key].map((item: any) => {
          return {
            ...item,
            AnchorId: `锚定节点${key}`,
          };
        }),
      ];
    });
    setChartData(chartArr);
  };

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setCurCrossChain(Object.keys(data)[0]);
    }
  }, [data]);

  useEffect(() => {
    if (curCrossChain) {
      let startTime: any;
      let formatStr = '';
      switch (filterType) {
        case 'hour':
          formatStr = 'YYYY-MM-DD hh:mm:ss';
          startTime = moment().subtract(48, 'hours');
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
      getChartData({
        startTime: startTime.format(formatStr),
        endTime: moment().subtract(24, 'hours').format(formatStr),
        tokenKey: curCrossChain,
        timeType: filterType,
      });
    }
  }, [filterType, curCrossChain]);

  return (
    <Card loading={loading} bordered={false} title="签名监控">
      <Form
        layout="inline"
        style={{
          marginBottom: 15,
        }}
      >
        <Form.Item label="选择跨链对">
          <Select
            style={{
              width: 150,
            }}
            placeholder="选择跨链对"
            value={curCrossChain}
            onChange={(value) => setCurCrossChain(value)}
          >
            {data
              ? Object.keys(data).map((key) => (
                  <Select.Option key={key} value={key}>
                    {data[key].Name}
                  </Select.Option>
                ))
              : null}
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
            onChange={(e: any) => setFilterType(e.nativeEvent.target.value)}
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
          <Axis name="Date" />
          <Axis
            name="Count"
            label={{
              formatter: (val) => {
                return val;
              },
            }}
          />
          <Tooltip showCrosshairs shared />
          <Geom type="line" position="Date*Count" size={2} color="AnchorId" />
          <Geom
            type="point"
            position="Date*Count"
            size={4}
            shape="circle"
            color="AnchorId"
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
