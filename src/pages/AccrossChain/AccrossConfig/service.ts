import request from '@/utils/request';
import { TableListItem } from './data.d';

export async function queryRule(params: any) {
  return request('/api/v1/retro/list', {
    method: 'POST',
    data: { ...params },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/v1/retro/add', {
    method: 'POST',
    data: {
      ...params,
      // method: 'post',
    },
  });
}

export async function queryChain() {
  return request('/api/v1/chain/list', {});
}

export async function queryWallet() {
  return request('/api/v1/wallet/list', {});
}
