import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import NodeCard from './components/NodeCard';
import SignatureCard from './components/SignatureCard';
import PoundageCard from './components/PoundageCard';
import AbnormalCard from './components/AbnormalCard';
import TransactionsCard from './components/TransactionsCard';
import { queryCrossTxList } from './service';
import { CrossChains } from './data.d';

export default function DataMonitoring() {
  const [crossTxMap, setCrossTxMap] = useState<CrossChains | undefined>(undefined);

  const getCrossTxList = async () => {
    const res = await queryCrossTxList();
    setCrossTxMap(res.data || {});
  };

  useEffect(() => {
    getCrossTxList();
  }, []);

  return (
    <PageHeaderWrapper>
      <NodeCard />
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <SignatureCard data={crossTxMap} />
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <PoundageCard />
        </Col>
      </Row>
      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <AbnormalCard />
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <TransactionsCard data={crossTxMap} />
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
}
