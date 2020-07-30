import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function queryRule(params?: any) {
  return request('/api/v1/contract/list', {
    params,
  });
}

export async function removeRule(id: number) {
  return request(`/api/v1/contract/remove/${id}`, {
    method: 'DELETE',
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/v1/contract/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/v1/contract/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function deployContract(params: TableListItem) {
  return request('/api/v1/contract/instance', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryNode() {
  return request('/api/v1/node/list', {});
}

export async function queryWallet() {
  return request('/api/v1/wallet/list', {});
}

export async function queryChain() {
  return request('/api/v1/chain/list', {});
}
