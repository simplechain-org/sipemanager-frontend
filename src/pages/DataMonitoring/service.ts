import request from '@/utils/request';
import { TableListParams, FeeChartParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/v1/chain/list', {
    params,
  });
}

export async function queryFee(params: FeeChartParams) {
  return request('/api/v1/chart/feeAndCount/list', {
    params,
  });
}

export async function queryMaxUncle() {
  return request('/api/v1/chart/maxUncle/list');
}
