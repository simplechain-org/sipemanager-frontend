import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function queryRule(params: TableListParams) {
  return request('/api/v1/contract/instance/list', {
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

export async function addRule(params: TableListItem) {
  // return request('/api/v1/contract/instance/add', {
  return request('api/v1/contract/instance/import', {
    method: 'POST',
    data: {
      ...params,
      chain_id: Number(params?.chain_id),
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addInstance(params: TableListItem) {
  return request('/api/v1/contract/instance', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryChain() {
  return request('/api/v1/chain/list', {});
}

export async function queryNode() {
  return request('/api/v1/node/list', {});
}

export async function queryWallet() {
  return request('/api/v1/wallet/list', {});
}

export async function queryContract() {
  return request('/api/v1/contract/list', {});
}
