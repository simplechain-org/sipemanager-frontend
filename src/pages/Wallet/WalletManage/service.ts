import request from '@/utils/request';
import { TableListParams, DeleteParams, UpdParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/v1/wallet/list/page', {
    params,
  });
}

export async function removeRule(params: DeleteParams) {
  return request(`/api/v1/wallet/remove`, {
    method: 'DELETE',
    params,
  });
}

export async function addRule(params: any) {
  return request('/api/v1/wallet', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: UpdParams) {
  return request('/api/v1/wallet/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
