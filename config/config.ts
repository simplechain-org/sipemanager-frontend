// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin'],
          routes: [
            {
              path: '/',
              redirect: '/data-monitoring',
            },
            {
              path: '/data-monitoring',
              name: 'monitoring',
              icon: 'smile',
              component: './DataMonitoring',
              routes: [
                {
                  path: '/data-monitoring',
                  name: 'monitor',
                  component: './DataMonitoring',
                },
              ],
            },
            {
              path: '/chain',
              name: 'chain',
              icon: 'smile',
              // component: './Chain',
              routes: [
                {
                  path: '/chain/list',
                  name: 'chainList',
                  component: './Chain/ChainList',
                },
                {
                  path: '/chain/chain-nodes',
                  name: 'chainNodes',
                  component: './Chain/ChainNodes',
                },
              ],
            },
            {
              path: '/contract',
              name: 'contract',
              icon: 'smile',
              routes: [
                {
                  path: '/contract',
                  name: 'contractManage',
                  component: './Contract/ContractManage',
                },
              ],
            },
            {
              path: '/accrossChain',
              name: 'accrossChain',
              icon: 'smile',
              // component: './AccrossChain',
              routes: [
                {
                  path: '/accrossChain/regist-record',
                  name: 'registRecord',
                  component: './AccrossChain/RegistRecord',
                },
                {
                  path: '/accrossChain/anchor-nodes',
                  name: 'anchorNodes',
                  component: './AccrossChain/AnchorNodes',
                },
                {
                  path: '/accrossChain/task',
                  name: 'task',
                  component: './AccrossChain/Task',
                },
              ],
            },
            // {
            //   path: '/blockBrowser',
            //   name: 'blockBrowser',
            //   icon: 'smile',
            //   component: './BlockBrowser',
            //   routes: [
            //     {
            //       path: '/blockBrowser/block-list',
            //       name: 'blockList',
            //       component: './BlockBrowser/BlockList',
            //     },
            //     {
            //       path: '/blockBrowser/trade-query',
            //       name: 'tradeQuery',
            //       component: './BlockBrowser/TradeQuery',
            //     },
            //   ],
            // },
            {
              path: '/wallet',
              name: 'wallet',
              icon: 'smile',
              routes: [
                {
                  path: '/wallet',
                  name: 'walletManage',
                  component: './Wallet/WalletManage',
                },
              ],
            },
            // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin'],
            //     },
            //   ],
            // },
            // {
            //   name: 'list.table-list',
            //   icon: 'table',
            //   path: '/list',
            //   component: './ListTableList',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
