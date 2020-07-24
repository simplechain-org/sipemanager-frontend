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
  chain_a: string;
  chain_a_id: number;
  chain_b: string;
  chain_b_id: number;
  created_at: Date;
  pledge: string;
  status: string;
}

export interface FeeTableListItem {
  CreatedAt: Date;
  ID: number;
  anchorNodeId: number;
  anchorNodeName: string;
  coin: string;
  fee: string;
  sender: string;
  status: number;
  transactionHash: string;
}

export interface PunishListItem {
  CreatedAt: string;
  ID: number;
  anchor_node_id: number;
  anchor_node_name: string;
  coin: string;
  manage_type: string;
  value: string;
}

export interface FeeCollectionType {
  accumulated_fee: string;
  current_fee: string;
  reimbursed_fee: string;
}

export interface AnchorNodeItem {
  ID: number;
  anchor_node_name: string;
  chain_a: string;
  chain_a_id: number;
  chain_b: string;
  chain_b_id: number;
  created_at: Date;
  pledge: string;
  status: string;
}

export interface FormPropsType {
  formItemYype: string;
  suffix?: string;
  formItemLabel: string;
  fieldName: string;
  isSelect: boolean;
  dataSource: any[];
  extra?: string;
  // isTips?: boolean;
  handle?: (value: number) => Promise<void> | null | undefined | void;
  needChange?: boolean;
  children?: React.ReactNode | undefined;
  rules?: any;
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
  coin_name: string;
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

export interface QueryParamsType {
  page_size: number;
  current_page: number;
  anchor_node_id: string | number;
}

export interface TableListPagination {
  total?: number;
  pageSize: number;
  current: number;
  [propsName: string]: string;
}

export interface BtnEleType {
  title: string;
  handle: () => {};
}

export interface AddFee {
  anchor_node_id: number;
  node_id: number;
  wallet_id: number;
  password: string;
  fee: string;
  coin: string;
  value?: string;
  manage_type?: string;
}

export interface QueryType {
  anchor_node_id: string | number;
  node_id: string | number;
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
