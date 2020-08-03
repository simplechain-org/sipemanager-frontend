export interface TableListItem {
  created_at: Date;
  DeletedAt: Date;
  id: number;
  UpdatedAt: Date;
  address: string;
  chain_id: number;
  chain_name: string;
  description: string;
  is_https: boolean;
  name: string;
  network_id: number;
  port: number;
  user_id: number;
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

export interface AddParams {
  address: string;
  chain_id: number;
  name: string;
  port: number;
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
  current_page?: number;
  page_size?: number;
}
