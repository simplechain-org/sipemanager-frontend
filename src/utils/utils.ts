import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import { Route } from '@/models/connect';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends Route>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};

export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

// 转换时间戳
export const transTime = (date: string) => {
  let str = '';
  str = date.substring(0, 19);
  str = str.replace(/-/g, '/');
  const timestamp = new Date(str).getTime();
  return timestamp;
};

// export const getRandomIP = () => {
//   let ip = [];
//   for (let i = 0; i < 4; i++) {
//     ip = `${ip + Math.floor(Math.random() * 256)}${i === 3 ? '' : '.'}`;
//   }
//   return ip;
// };

// export const getRandomPort = () => {
//   let port = [];
//   for (let i = 0; i < 4; i++) {
//     port = `${port}${Math.floor(Math.random() * 10)}`;
//   }
//   return port;
// };

const BigNumber = require('bignumber.js');

// 转换wei
export const formDecimalWei = (value: string, decimal: number = 18): string => {
  const newValue = BigNumber(value).div(BigNumber(10).power(decimal));
  return BigNumber(newValue).toString(10) === 'NaN' ? '0' : BigNumber(newValue).toString(10);
};

// 转换为Wei
export const transToWei = (value: string, decimal: number = 18): string => {
  const newValue = BigNumber(value).times(BigNumber(10).pow(decimal));
  return BigNumber(newValue).toString(10) === 'NaN' ? '0' : BigNumber(newValue).toString(10);
};
