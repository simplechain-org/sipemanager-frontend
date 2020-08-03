import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

export async function queryRule(params?: TableListParams) {
  return request('/api/v1/node/list/page', {
    params,
  });
}

export async function removeRule(id: number) {
  return request(`/api/v1/node/remove/${id}`, {
    method: 'DELETE',
    // data: {
    //   ...params,
    //   method: 'delete',
    // },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/v1/node', {
    method: 'POST',
    data: {
      ...params,
      // method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/v1/node', {
    method: 'PUT',
    data: {
      ...params,
      // method: 'update',
    },
  });
}

export async function queryChain(params?: TableListParams) {
  return request('/api/v1/chain/list/all', {
    params,
  });
}
