import React, { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Row, Col, Space, Form } from 'antd';
import { history, useParams } from 'umi';
import './details.less';
import { queryDetails } from '../service';
import { FormProps } from '../data.d';

interface DetailsPageProps {}

const DisplayForm = (prop: FormProps[], values: any) => {
  return (
    <>
      <Row gutter={16}>
        {prop.map((item) => (
          <Col span={24} key={item.label}>
            <Form.Item label={item.label}>{values[item.name] || ''}</Form.Item>
          </Col>
        ))}
      </Row>
    </>
  );
};

const totalList: FormProps[] = [
  {
    label: '日志编号',
    name: 'created_at',
  },
  {
    label: '发起链',
    name: 'anchor_node_name',
  },
  {
    label: '目标链',
    name: 'pledge',
  },
  {
    label: '最少签名数',
    name: 'status',
  },
  {
    label: '锚定节点1',
    name: 'chain_a',
  },
  {
    label: '锚定节点2',
    name: 'chain_b',
  },
  {
    label: '状态',
    name: 'chain_a',
  },
  {
    label: 'TX哈希',
    name: 'chain_b',
  },
];

const DetailsPage: React.FC<DetailsPageProps> = () => {
  const params: { id: string } = useParams();
  const [values, setValues] = useState(null);
  useEffect(() => {
    async function fetchData() {
      if (params.id !== 'undefined') {
        const res = await queryDetails({ id: params.id });
        setValues(res.data);
      }
    }
    fetchData();
  }, [params.id]);

  return (
    <div className="wrapper">
      <div className="head_title">
        <Space size="middle">
          <a className="btn" onClick={() => history.goBack()}>
            <LeftOutlined />
            返回
          </a>
          <span>链注册日志详情</span>
        </Space>
      </div>
      <div className="content">{DisplayForm(totalList, values)}</div>
    </div>
  );
};

export default DetailsPage;
