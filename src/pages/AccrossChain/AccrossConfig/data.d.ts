export interface TableListItem {
  ctx_id: string;
  event: number;
  network_id: number;
  status: number;
  tx_hash: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ChainListItem {
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  UpdatedAt: Date;
  coin_name: string;
  name: string;
  network_id: number;
  symbol: string;
}

export interface WalletListItem {
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  UpdatedAt: Date;
  UserId: 1;
  address: string;
  content: string;
  name: string;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
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
