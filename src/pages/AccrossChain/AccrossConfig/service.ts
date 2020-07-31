import request from '@/utils/request';
import { TableListItem } from './data.d';

export async function queryRule(params: any) {
  return request('/api/v1/reward/prepare/reward/list', {
    params,
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/v1/chain/cross/prepare/reward', {
    method: 'POST',
    data: {
      ...params,
      // method: 'post',
    },
  });
}

export async function updateRule(params: TableListItem) {
  return request('/api/v1/chain/cross/prepare/reward/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryChain() {
  return request('/api/v1/chain/list/all', {});
}

export async function queryWallet() {
  return request('/api/v1/wallet/list/all', {});
}
