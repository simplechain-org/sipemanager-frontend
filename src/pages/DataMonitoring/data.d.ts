export interface TableListItem {
  name: string;
  createdAt: string;
  network_id: number;
  ID: number;
  coin_name: string;
  symbol: string;
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
