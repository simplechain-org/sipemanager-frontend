export interface TableListItem {
  name: string;
  createdAt: string;
  network_id: number;
  ID: number;
  coin_name: string;
  symbol: string;
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
  ID: number;
  name: string;
}
