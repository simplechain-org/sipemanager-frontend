export interface TableListItem {
  anchor_node_name: string;
  ID: number;

  anchor_address: string;
  anchor_name: string;
  password: string;
  source_chain_id: number;
  source_node_id: number;
  target_chain_id: number;
  target_node_id: number;
  wallet_id: number;
}

export interface AnchorNodeItem {
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  UpdatedAt: Date;
  coin_name: string;
  name: string;
  network_id: number;
  symbol: string;
}

export interface FormPropsType {
  formItemYype: string;
  formItemLabel: string;
  fieldName: string;
  isSelect: boolean;
  dataSource: NodeListItem[] | WalletListItem[] | ChainListItem[];
  extra?: string;
  isTips?: boolean;
  handle?: (value: number) => Promise<void> | null | undefined;
  needChange?: boolean;
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

export interface WalletListItem {
  CreatedAt: Date;
  ID: number;
  name: string;
  address: string;
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

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface BtnEleType {
  title: string;
  handle: () => {};
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

export interface FormProps {
  label: string;
  name: string;
  entiryLine?: boolean;
}

export interface ListItemType {
  anchor_node_name: string;
  chain_a: string;
  chain_name: string;
  make_finish: string;
  reimbursed_fee: string;
  reward: string;
  valid_signature: string;
  chain_b: string;
  chain_name: string;
  make_finish: string;
  reimbursed_fee: string;
  reward: string;
  valid_signature: string;
  created_at: string;
  pledge: string;
  status: string;
}
