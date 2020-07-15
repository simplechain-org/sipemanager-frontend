import React from 'react';
import { Form, Row, Col, Divider, Space } from 'antd';
import { history, useParams } from 'umi';
import './details.less';

interface DetailsPageProps {}

interface FormProps {
  label: string;
  name: string;
  entiryLine?: boolean;
}

const DisplayForm = (prop: FormProps[]) => {
  const params: { id: string } = useParams();
  console.log(params.id);

  return (
    <>
      <Row gutter={16}>
        {prop.map((item) => (
          <Col span={item?.entiryLine ? 24 : 12} key={item.label}>
            <Form.Item label={item.label} name={item.name}>
              {/* {item.value} */}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </>
  );
};

const totalList: FormProps[] = [
  {
    label: '创建时间',
    name: 'CreatedAt',
  },
  {
    label: '锚定节点名称',
    name: 'CreatedAt',
  },
  {
    label: '质押金额',
    name: 'CreatedAt',
  },
  {
    label: '身份状态',
    name: 'CreatedAt',
  },
  {
    label: '归属链A',
    name: 'CreatedAt',
  },
  {
    label: '归属链B',
    name: 'CreatedAt',
  },
];

const sourceList: FormProps[] = [
  {
    label: '链A',
    name: 'CreatedAt',
    entiryLine: true,
  },
  {
    label: 'makefinish手续费',
    name: 'CreatedAt',
  },
  {
    label: '已报销手续费',
    name: 'CreatedAt',
  },
  {
    label: '累计有效签名',
    name: 'CreatedAt',
  },
  {
    label: '累计发放签名奖励',
    name: 'CreatedAt',
  },
];

const targetList: FormProps[] = [
  {
    label: '链B',
    name: 'CreatedAt',
    entiryLine: true,
  },
  {
    label: 'makefinish手续费',
    name: 'CreatedAt',
  },
  {
    label: '已报销手续费',
    name: 'CreatedAt',
  },
  {
    label: '累计有效签名',
    name: 'CreatedAt',
  },
  {
    label: '累计发放签名奖励',
    name: 'CreatedAt',
  },
];

const DetailsPage: React.FC<DetailsPageProps> = () => {
  return (
    <div className="wrapper">
      <div className="head_title">
        <Space>
          <a className="btn" onClick={() => history.goBack()}>
            返回
          </a>
          <span>查看锚定节点</span>
        </Space>
      </div>
      <div className="content">
        <Form>{DisplayForm(totalList)}</Form>
        <Divider />
        <Form>{DisplayForm(sourceList)}</Form>
        <Divider />
        <Form>{DisplayForm(targetList)}</Form>
      </div>
    </div>
  );
};

export default DetailsPage;
