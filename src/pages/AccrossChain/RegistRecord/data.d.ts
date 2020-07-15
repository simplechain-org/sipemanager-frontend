export interface TableListItem {
  ID: number;
  CreatedAt: Date;
  DeletedAt: Date;
  UpdatedAt: Date;
  address: string;
  anchor_addresses: string;
  confirm: number;
  source_chain_id: number;
  status: number;
  status_text: string;
  target_chain_id: number;
  tx_hash: string;
}

export interface ChainListType {
  name: string;
  createdAt: string;
  network_id: number;
  ID: number;
  coin_name: string;
  symbol: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
