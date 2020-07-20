import React, { useState, useEffect } from 'react';
import { Card, Select, Table } from 'antd';
import { NodeProps } from '../data.d';

export default function NodeCard(props: NodeProps) {
  const [loading, setLoading] = useState(true);
  const { data } = props;
  const [curCrossChain, setCurCrossChain] = useState<undefined | string>(undefined);
  const [tableData] = useState([]);

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setCurCrossChain(Object.keys(data)[0]);
    }
  }, [data]);

  const getNodeList = async () => {
    // const res = await queryNodeList();
    // setTableData(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    getNodeList();
  }, [curCrossChain]);

  const columns = [
    {
      title: '锚定节点名称',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'A链账户余额',
      dataIndex: 'keyword',
      key: 'keyword',
      render: (text: React.ReactNode) => `${text}sipc`,
    },
    {
      title: 'B链账户余额',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '是否在线',
      dataIndex: 'range',
      key: 'range',
    },
    {
      title: '连续未签名交易数',
      dataIndex: 'heihei',
      key: 'heihei',
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
              width: 150,
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
        rowKey={(record) => record.index}
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
