import request from '@/utils/request';
import { TableListParams, TableListItem, QueryParamsType, AddFee, QueryType } from './data';

export async function queryRule(params?: QueryParamsType) {
  return request('/api/v1/anchor/node/list', {
    params,
  });
}

export async function queryFee(params?: QueryParamsType) {
  return request('/api/v1/service/charge/list', { params });
}

export async function queryReward(params: QueryParamsType) {
  return request('/api/v1/reward/list', { params });
}

export async function queryPunish(params: QueryParamsType) {
  return request('/api/v1/punishment/list', { params });
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

export async function addFee(params: AddFee) {
  return request('/api/v1/service/charge/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addPunish(params: AddFee) {
  return request('/api/v1/punishment/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryChargeFee(params: any) {
  return request('/api/v1/service/charge/fee', {
    params,
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

export async function queryRewardTotal(params: QueryType) {
  return request('/api/v1/reward/total', {
    params,
  });
}

export async function queryRewardChain(params: QueryType) {
  return request('/api/v1/reward/chain', {
    params,
  });
}

export async function querySignatureCount(params: QueryType) {
  return request('/api/v1/anchor/work/count', {
    params,
  });
}

export async function rewardAdd(params: AddFee) {
  return request('/api/v1/reward/add', {
    data: {
      ...params,
    },
  });
}
