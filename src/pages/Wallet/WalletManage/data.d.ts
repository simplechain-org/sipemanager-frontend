export interface TableListItem {
  created_at: Date;
  DeletedAt: Date;
  id: number;
  UpdatedAt: Date;
  UserId: 1;
  address: string;
  content: string;
  name: string;
}

export interface DeleteParams {
  wallet_id: number;
}

export interface UpdParams {
  wallet_id: number;
  old_password: string;
  new_password: string;
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
  page_size?: number;
  current_page?: number;
}
