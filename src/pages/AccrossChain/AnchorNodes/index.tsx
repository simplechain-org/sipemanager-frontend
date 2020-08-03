import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import AnchorNodes from './AnchorNodes';
import { TableListItem } from './data.d';
import { queryChainAll, queryRule, queryNodeAll, queryWalletAll, queryAnchorAll } from './service';

const AnchorNode: React.FC<{}> = () => {
  const [publicList, setPublicList] = useState({});

  const getOptionList = async () => {
    const chainRes = await queryChainAll();
    const nodeRes = await queryNodeAll();
    const walletRes = await queryWalletAll();
    const anchorRes = await queryRule();
    const anchorAllRes = await queryAnchorAll();
    const enumMap = {};
    anchorAllRes.data.map((item: TableListItem) => {
      enumMap[item.id] = item.name;
      return false;
    });
    setPublicList({
      nodeList: nodeRes.data || [],
      wallestList: walletRes.data || [],
      anchorNodeList: anchorRes.data.page_data.map((item: TableListItem) => ({
        text: item.anchor_node_name,
        name: item.anchor_node_name,
        ...item,
      })),
      chainList: chainRes.data || [],
      anchorEnum: enumMap,
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
