export interface TableListItem {
  created_at: Date;
  deleted_at: Date;
  id: number;
  source_chain_coin: string;
  source_chain_id: number;
  source_chain_name: string;
  source_reward: number;
  target_chain_coin: string;
  target_chain_id: number;
  target_chain_name: string;
  target_reward: number;
  updated_at: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface ChainListItem {
  CreatedAt: Date;
  DeletedAt: Date;
  id: number;
  UpdatedAt: Date;
  coin_name: string;
  name: string;
  network_id: number;
  symbol: string;
}

export interface WalletListItem {
  CreatedAt: Date;
  DeletedAt: Date;
  id: number;
  UpdatedAt: Date;
  UserId: number;
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
