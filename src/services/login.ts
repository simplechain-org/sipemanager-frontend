import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/v1/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function fakeAccountRegister(params: LoginParamsType) {
  return request('/api/v1/user/register', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
