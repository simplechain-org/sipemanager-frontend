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

export interface AddRegisteType {
  source_chain_id: number;
  target_chain_id: number;
  source_node_id: number;
  target_node_id: number;
  sign_confirm_count: number;
  wallet_id: number;
  password: string;
  anchor_addresses: string[];
  anchor_names: string[];
}

export interface ChainListType {
  name: string;
  createdAt: string;
  network_id: number;
  ID: number;
  coin_name: string;
  symbol: string;
}

export interface NodeItem {
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  UpdatedAt: Date;
  address: string;
  chain_id: number;
  is_https: boolean;
  name: string;
  port: number;
  user_id: number;
}

export interface FormProps {
  label: string;
  name: string;
  entiryLine?: boolean;
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
