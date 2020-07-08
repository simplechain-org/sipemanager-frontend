import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/v1/chain/list', {
    params,
  });
}
