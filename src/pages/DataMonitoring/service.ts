import request from '@/utils/request';
import { TableListParams, FeeChartParams, SignatureChartParams } from './data.d';

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
