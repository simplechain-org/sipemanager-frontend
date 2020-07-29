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
        {prop
          ? prop.map((item) => (
              <Col span={24} key={item.label}>
                <Form.Item label={item.label}>{values[item.name] || ''}</Form.Item>
              </Col>
            ))
          : null}
      </Row>
    </>
  );
};

const DetailsPage: React.FC<DetailsPageProps> = () => {
  const params: { id: string } = useParams();
  const [values, setValues] = useState({});
  const [totalList, setTotalList] = useState<FormProps[]>([]);
  useEffect(() => {
    async function fetchData() {
      if (params.id !== 'undefined') {
        const res = await queryDetails({ id: params.id });
        let resValue = {};
        if (res.data) {
          const anchorValueObj = {};
          res.data.anchor_nodes.forEach((item: any, index: number) => {
            anchorValueObj[`anchor_node_${index + 1}`] = item.Name;
          });
          resValue = {
            ...res.data,
            ...anchorValueObj,
          };
          const formLabels = (res.data.anchor_nodes || []).map((_: any, index: number) => ({
            label: `锚定节点${index + 1}`,
            name: `anchor_node_${index + 1}`,
          }));
          const formList: FormProps[] = [
            {
              label: '日志编号',
              name: 'ID',
            },
            {
              label: '发起链',
              name: 'source_chain_name',
            },
            {
              label: '目标链',
              name: 'target_chain_name',
            },
            {
              label: '最少签名数',
              name: 'confirm',
            },
            ...formLabels,
            {
              label: '状态',
              name: 'status_text',
            },
            {
              label: 'TX哈希',
              name: 'tx_hash',
            },
          ];
          setTotalList(formList);
        }
        setValues(resValue);
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
