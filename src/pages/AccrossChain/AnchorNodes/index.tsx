import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import AnchorNodes from './AnchorNodes';
import { TableListItem } from './data.d';
import { queryChain, queryRule, queryNode, queryWallet } from './service';

const AnchorNode: React.FC<{}> = () => {
  const [publicList, setPublicList] = useState({});

  const getOptionList = async () => {
    const chainRes = await queryChain();
    const nodeRes = await queryNode();
    const walletRes = await queryWallet();
    const anchorRes = await queryRule();
    setPublicList({
      nodeList: nodeRes.data || [],
      wallestList: walletRes.data || [],
      anchorNodeList: anchorRes.data.page_data.map((item: TableListItem) => ({
        text: item.anchor_node_name,
        name: item.anchor_node_name,
        ...item,
      })),
      chainList: chainRes.data.page_data || [],
    });
  };
  useEffect(() => {
    getOptionList();
  }, []);

  return (
    <PageHeaderWrapper>
      <AnchorNodes publicList={publicList} />
    </PageHeaderWrapper>
  );
};

export default AnchorNode;
