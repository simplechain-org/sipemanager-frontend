import request from '@/utils/request';
import { TableListParams, AddRegisteType } from './data';

export async function queryRule(params?: any) {
  return request('/api/v1/chain/register/list', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: AddRegisteType) {
  return request('/api/v1/contract/register/once', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function queryChain(params?: TableListParams) {
  return request('/api/v1/chain/list', {
    params,
  });
}

export async function queryDetails(params: any) {
  return request('/api/v1/chain/register/info', {
    params,
  });
}

export async function getNodeByChain(params: { chain_id: string }) {
  return request('/api/v1/chain/node', { params });
}
export async function queryWallet() {
  return request('/api/v1/wallet/list', {});
}
