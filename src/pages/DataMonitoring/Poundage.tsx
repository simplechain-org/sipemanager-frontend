import React, { useRef, useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { transTime } from '@/utils/utils';
import { TableListItem, AnchorNodeItem } from './data.d';
import { queryFinishList, queryAnchorList } from './service';

const Web3Utils = require('web3-utils');
const BigNumber = require('bignumber.js');

export default function Poundage() {
  const actionRef = useRef<ActionType>();
  const [anchorList, setAnchorList] = useState({});
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    async function getAnchor() {
      const res = await queryAnchorList();
      const enumMap = {};
      res.data.map((item: AnchorNodeItem) => {
        enumMap[item.id] = item.name;
        return false;
      });
      setAnchorList(enumMap);
    }
    getAnchor();
  }, []);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '锚定节点',
      dataIndex: 'anchorId',
      valueEnum: anchorList,
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '时间',
      dataIndex: 'Timestamp',
      valueType: 'dateTimeRange',
      render: (text: any) => {
        return moment.unix(text).format('YYYY-MM-DD HH:mm:ss');
        // return new Date(text * 1000).toLocaleDateString();
      },
    },
    {
      title: '跨链对',
      dataIndex: 'TokenName',
      hideInSearch: true,
    },
    {
      title: '锚定节点名称',
      dataIndex: 'AnchorName',
      hideInSearch: true,
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
      render: (text: React.ReactNode, row: TableListItem) => {
        return `${Web3Utils.fromWei(
          new BigNumber(Number(row.GasPrice) * Number(row.GasUsed) || 0).toFixed(),
        )}SIPC`;
      },
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey={(record) => record.toString()}
        beforeSearchSubmit={(params: any) => {
          return {
            startTime: `${transTime(params.Timestamp ? params.Timestamp[0] : '') || ''}` || '',
            endTime: `${transTime(params.Timestamp ? params.Timestamp[1] : '') || ''}` || '',
            anchorId: params.anchorId ? params.anchorId : '',
          } as Partial<TableListItem>;
        }}
        request={(params: any) => {
          return queryFinishList({
            page: `${params.current}`,
            limit: `${params.pageSize}`,
            anchorId: params.anchorId,
            startTime: params.startTime ? params.startTime.substring(0, 10) : '',
            endTime: params.endTime ? params.endTime.substring(0, 10) : '',
          });
        }}
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
