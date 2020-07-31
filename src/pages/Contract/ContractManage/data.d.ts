export interface TableListItem {
  created_at: Date;
  DeletedAt: Date;
  id: number;
  UpdatedAt: Date;
  abi: string;
  bin: string;
  name: string;
  sol: string;
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
