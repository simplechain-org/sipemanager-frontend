export interface TableListItem {
  name: string;
  created_at: string;
  network_id: number;
  id: number;
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
  page_size: number;
  current_page: number;
}
