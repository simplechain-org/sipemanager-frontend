import React, { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Row, Col, Divider, Space } from 'antd';
import { history, useParams } from 'umi';
import './details.less';
import { queryDetails } from '../service';
import { FormProps, ListItemType } from '../data.d';

interface DetailsPageProps {}

const DisplayForm = (prop: FormProps[], values: ListItemType) => {
  return (
    <>
      <Row gutter={16}>
        {prop.map((item) => (
          <Col span={item?.entiryLine ? 24 : 12} key={item.label}>
            <div className="list_item">
              <span>{`${item.label}：`}</span>
              <span>{values[item.name] || ''}</span>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

const totalList: FormProps[] = [
  {
    label: '创建时间',
    name: 'created_at',
  },
  {
    label: '锚定节点名称',
    name: 'anchor_node_name',
  },
  {
    label: '质押金额',
    name: 'pledge',
  },
  {
    label: '身份状态',
    name: 'status',
  },
  {
    label: '归属链A',
    name: 'chain_a',
  },
  {
    label: '归属链B',
    name: 'chain_b',
  },
];

const sourceList: FormProps[] = [
  {
    label: '链A',
    name: 'chain_name',
    entiryLine: true,
  },
  {
    label: 'makefinish手续费',
    name: 'make_finish',
  },
  {
    label: '已报销手续费',
    name: 'reimbursed_fee',
  },
  {
    label: '累计有效签名',
    name: 'valid_signature',
  },
  {
    label: '累计发放签名奖励',
    name: 'reward',
  },
];

const targetList: FormProps[] = [
  {
    label: '链B',
    name: 'chain_name',
    entiryLine: true,
  },
  {
    label: 'makefinish手续费',
    name: 'make_finish',
  },
  {
    label: '已报销手续费',
    name: 'reimbursed_fee',
  },
  {
    label: '累计有效签名',
    name: 'valid_signature',
  },
  {
    label: '累计发放签名奖励',
    name: 'reward',
  },
];

const DetailsPage: React.FC<DetailsPageProps> = () => {
  const params: { ID: string } = useParams();
  const [values, setValues] = useState({});
  const [sourceValues, setSourceValues] = useState({});
  const [targetValues, setTargetValues] = useState({});
  useEffect(() => {
    async function fetchData() {
      const res = await queryDetails({ anchor_node_id: Number(params.ID) });
      setSourceValues(res.data?.chain_a_info || {});
      setTargetValues(res.data?.chain_b_info || {});
      setValues(res.data || {});
    }
    fetchData();
  }, [params.ID]);

  return (
    <div className="wrapper">
      <div className="head_title">
        <Space size="middle">
          <a className="btn" onClick={() => history.goBack()}>
            <LeftOutlined />
            返回
          </a>
          <span>查看锚定节点</span>
        </Space>
      </div>
      <div className="content">
        {DisplayForm(totalList, values as ListItemType)}
        <Divider />
        {DisplayForm(sourceList, sourceValues as ListItemType)}
        <Divider />
        {DisplayForm(targetList, targetValues as ListItemType)}
      </div>
    </div>
  );
};

export default DetailsPage;
