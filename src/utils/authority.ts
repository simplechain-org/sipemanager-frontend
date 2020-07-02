import { reloadAuthorized } from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }
  return authority;
}

interface Authority {
  role: string;
  username: string;
  token: string;
}

export function setAuthority(authority: Authority | undefined): void {
  if (authority) {
    localStorage.setItem('antd-pro-authority', JSON.stringify([authority.role]));
    localStorage.setItem('accessToken', authority.token);
    localStorage.setItem('CHAIN_USER_NAME', authority.username);
  } else {
    localStorage.removeItem('antd-pro-authority');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('CHAIN_USER_NAME');
  }
  // auto reload
  reloadAuthorized();
}
