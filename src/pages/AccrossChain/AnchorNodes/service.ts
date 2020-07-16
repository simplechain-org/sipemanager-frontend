import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function queryRule(params?: { current_page: number; page_size: number }) {
  return request('/api/v1/anchor/node/list', {
    params,
  });
}

export async function queryFee() {
  return request('/api/v1/service/charge/list', {});
}

export async function queryReward() {
  return request('/api/v1/reward/list', {});
}

export async function queryPunish() {
  return request('/api/v1/punishment/list', {});
}

export async function queryDetails(params: { anchor_node_id: number }) {
  return request('/api/v1/anchor/node/obtain', { params });
}

export async function getNodeByChain(params: { chain_id: number }) {
  return request('/api/v1/chain/node', { params });
}

export async function removeRule(params: TableListItem) {
  return request('/api/v1/anchor/node/remove', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/v1/anchor/node/add', {
    method: 'POST',
    data: {
      ...params,
      // method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      // method: 'update',
    },
  });
}

export async function queryWallet() {
  return request('/api/v1/wallet/list', {});
}

export async function queryChain() {
  return request('/api/v1/chain/list', {});
}

export async function queryNode() {
  return request('/api/v1/node/list', {});
}
