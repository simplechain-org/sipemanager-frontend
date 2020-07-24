import request from '@/utils/request';
import { TableListParams, TableListItem } from './data.d';

export async function queryChainList(params?: TableListParams) {
  return request('/api/v1/chain/list', {
    params,
  });
}

export async function removeRule(id: number) {
  return request(`/api/v1/chain/${id}`, {
    method: 'DELETE',
  });
}

export async function addRule(params: Partial<TableListItem>) {
  return request('/api/v1/chain/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: any) {
  return request('/api/v1/chain/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function queryContract(chain_id: number) {
  return request('/api/v1/contract/chain', {
    params: {
      chain_id,
    },
  });
}
