export interface TableListItem {
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  UpdatedAt: Date;
  abi: string;
  bin: string;
  description: string;
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
