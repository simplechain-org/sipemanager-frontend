import React, { useRef, useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { transTime } from '@/utils/utils';
import { TableListItem, AnchorNodeItem } from './data.d';
import { queryFinishList, queryAnchorList } from './service';

const Web3Utils = require('web3-utils');

export default function Poundage() {
  const actionRef = useRef<ActionType>();
  const [anchorList, setAnchorList] = useState({});
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    async function getAnchor() {
      const res = await queryAnchorList();
      setAnchorList(
        {
          ...res.data.page_data.map((item: AnchorNodeItem) => ({
            text: item.anchor_node_name,
            ...item,
          })),
        } || {},
      );
    }
    getAnchor();
  }, []);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '时间',
      dataIndex: 'Timestamp',
      valueType: 'dateTimeRange',
    },
    {
      title: '跨链对',
      dataIndex: 'TokenName',
      hideInSearch: true,
    },
    {
      title: '锚定节点名称',
      dataIndex: 'AnchorName',
      valueEnum: anchorList,
    },
    {
      title: '交易哈希',
      dataIndex: 'Hash',
      hideInSearch: true,
    },
    {
      title: 'Makefinish手续费',
      dataIndex: 'GasPrice',
      hideInSearch: true,
      render: (text: React.ReactNode) => `${Web3Utils.fromWei((text || '').toString())}SIPC`,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="AnchorId"
        request={
          // 为解决不会触发request请求的问题。。。。。。
          (params: any) => {
            let obj: any = {};
            if (!params.Timestamp && !params.AnchorName) {
              obj = {
                page: `${params.current}`,
                limit: `${params.pageSize}`,
              };
            } else if (params.Timestamp && !params.AnchorName) {
              obj = {
                page: `${params.current}`,
                limit: `${params.pageSize}`,
                startTime: transTime(params.Timestamp[0]),
                endTime: `${transTime(params.Timestamp[1])}`,
              };
            } else if (!params.Timestamp && params.AnchorName) {
              obj = {
                page: `${params.current}`,
                limit: `${params.pageSize}`,
                anchorId: anchorList[params.AnchorName].ID,
              };
            } else {
              obj = {
                page: `${params.current}`,
                limit: `${params.pageSize}`,
                startTime: transTime(params.Timestamp[0]),
                endTime: `${transTime(params.Timestamp[1])}`,
                anchorId: anchorList[params.AnchorName].ID,
              };
            }
            return queryFinishList(obj);
          }
          // (params: any) =>
          //   queryFinishList({
          //     page: params.current || 1,
          //     limit: params.pageSize || 10,
          //     startTime: `${transTime(params?.Timestamp[0])}`,
          //     endTime: `${transTime(params?.Timestamp[1])}`,
          //     anchorId: `${anchorList[params?.AnchorName].ID}`,
          //   })
        }
        postData={(data: any) => {
          setPageCount(data.Count);
          return data.FinishEventList;
        }}
        pagination={{
          total: pageCount,
          defaultPageSize: 10,
        }}
        options={false}
        tableAlertRender={false}
        columns={columns}
        rowSelection={false}
      />
    </PageHeaderWrapper>
  );
}
