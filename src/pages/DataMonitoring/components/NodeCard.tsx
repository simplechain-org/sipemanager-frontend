import React, { useState, useEffect } from 'react';
import { Card, Select, Table } from 'antd';
import { NodeProps } from '../data.d';
import { queryNodeList } from '../service';

const Web3Utils = require('web3-utils');
const BigNumber = require('bignumber.js');

export default function NodeCard(props: NodeProps) {
  const [loading, setLoading] = useState(true);
  const { data } = props;
  const [curCrossChain, setCurCrossChain] = useState<undefined | string>(undefined);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setCurCrossChain(Object.keys(data)[0]);
    }
  }, [data]);

  const getNodeList = async () => {
    if (curCrossChain) {
      const res = await queryNodeList({ tokenKey: curCrossChain });
      setTableData(res.data || []);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNodeList();
  }, [curCrossChain]);

  const columns = [
    {
      title: '锚定节点名称',
      dataIndex: 'AnchorName',
      key: 'AnchorName',
    },
    {
      title: 'A链账户余额',
      dataIndex: 'SourceBalance',
      key: 'SourceBalance',
      render: (text: React.ReactNode, record: any) =>
        `${Web3Utils.fromWei(new BigNumber(text || 0).toFixed())}${record.SourceChain.symbol}`,
    },
    {
      title: 'B链账户余额',
      dataIndex: 'TargetBalance',
      key: 'TargetBalance',
      render: (text: React.ReactNode, record: any) =>
        `${Web3Utils.fromWei(new BigNumber(text || 0).toFixed())}${record.TargetChain.symbol}`,
    },
    // {
    //   title: '是否在线',
    //   dataIndex: 'OnLine',
    //   key: 'OnLine',
    //   render: (text: boolean) => (text ? '是' : '否'),
    // },
    {
      title: '近200笔交易签名数',
      dataIndex: 'SignTxCount',
      key: 'SignTxCount',
    },
  ];

  return (
    <Card
      loading={loading}
      bordered={false}
      title={
        <>
          <span>锚定节点监控</span>
          <Select
            style={{
              float: 'right',
              width: 200,
            }}
            placeholder="选择跨链对"
            allowClear
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
        </>
      }
    >
      <Table<any>
        rowKey="AnchorId"
        size="small"
        columns={columns}
        dataSource={tableData}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 5,
        }}
      />
    </Card>
  );
}
