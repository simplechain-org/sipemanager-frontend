import request from '@/utils/request';
import { TableListParams, FeeChartParams, SignatureChartParams, FinishParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/v1/chain/list', {
    params,
  });
}

// makefinish手续费监控图表
export async function queryFee(params: FeeChartParams) {
  return request('/api/v1/chart/feeAndCount/list', {
    params,
  });
}
// 签名监控图表
export async function querySignature(params: SignatureChartParams) {
  return request('/api/v1/chart/anchorCount/list', {
    params,
  });
}

export async function queryMaxUncle() {
  return request('/api/v1/chart/maxUncle/list');
}

// 跨链交易对列表
export async function queryTokenList() {
  return request('/api/v1/chart/txTokenList/list');
}
// 跨链交易数列表
export async function queryCrossTxList() {
  return request('/api/v1/chart/crossTxCount/list');
}

// 锚定节点监控列表
export async function queryNodeList(params: { tokenKey: string }) {
  return request('/api/v1/chart/crossMonitor/list', {
    params,
  });
}

// makefinish记录
export async function queryFinishList(params: FinishParams) {
  return request('/api/v1/chart/finishList/list', {
    params,
  });
}

// 锚定节点列表
export async function queryAnchorList() {
  return request('/api/v1/service/charge/list');
  // return request('/api/v1/anchor/node/list/all');
}
