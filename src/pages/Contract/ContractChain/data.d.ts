export interface TableListItem {
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  UpdatedAt: Date;
  address: string;
  chain_id: number;
  contract_id: number;
  tx_hash: string;
}

export interface FormPropsType {
  formItemYype: string;
  formItemLabel: string;
  fieldName: string;
  isRequire: boolean;
  isSelect: boolean;
  datasource: Array;
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

export interface NodeListItem {
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
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

export interface ContractListItem {
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  UpdatedAt: Date;
  abi: string;
  bin: string;
  description: string;
  sol: string;
}

export interface WalletListItem {
  CreatedAt: Date;
  ID: number;
  name: string;
  address: string;
}

export interface ImportParams {
  abi: string;
  address: string;
  bin: string;
  chain_id: number;
  description: string;
  sol: string;
  tx_hash: string;
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
