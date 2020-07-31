export interface TableListItem {
  name: string;
  createdAt: string;
  network_id: number;
  id: number;
  coin_name: string;
  symbol: string;
  GasPrice: string;
  GasUsed: string;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

interface ChartParams {
  startTime: string;
  endTime: string;
  timeType: 'hour' | 'day' | 'week';
}

export interface FeeChartParams extends ChartParams {
  chainId: number;
}

export interface FinishParams {
  startTime: string;
  endTime: string;
  anchorId: string;
  page: string;
  limit: string;
}

export interface AnchorNodeItem {
  id: number;
  anchor_node_name: string;
  chain_a: string;
  chain_a_id: number;
  chain_b: string;
  chain_b_id: number;
  created_at: Date;
  pledge: string;
  status: string;
}

export interface SignatureChartParams extends ChartParams {
  tokenKey: string;
}

export interface CrossChainItem {
  Name: string;
  ChainID: number;
  Count: number;
}

export interface CrossChains {
  [key: string]: CrossChainItem;
}

export interface TransactionsProps {
  data: CrossChains | undefined;
}
export interface SignatureProps {
  data: CrossChains | undefined;
}
export interface NodeProps {
  data: CrossChains | undefined;
}

export interface ChainItem {
  id: number;
  name: string;
}
