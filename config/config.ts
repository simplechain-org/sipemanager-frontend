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
          routes: [
            {
              path: '/',
              redirect: '/data-monitoring',
            },
            {
              path: '/data-monitoring',
              name: 'monitoring',
              icon: 'dashboard',
              routes: [
                {
                  path: '/data-monitoring',
                  name: 'monitor',
                  component: './DataMonitoring',
                },
                {
                  path: '/data-monitoring/poundage',
                  name: 'poundage',
                  component: './DataMonitoring/Poundage',
                  hideInMenu: true,
                },
              ],
            },
            {
              path: '/chain',
              name: 'chain',
              icon: 'nodeIndex',
              // component: './Chain',
              authority: ['admin'],
              routes: [
                {
                  path: '/chain/list',
                  name: 'chainList',
                  component: './Chain/ChainList',
                  authority: ['admin'],
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
              icon: 'audit',
              routes: [
                {
                  path: '/contract/manage',
                  name: 'contractManage',
                  component: './Contract/ContractManage',
                },
                {
                  path: '/contract/chain',
                  name: 'contractChain',
                  component: './Contract/ContractChain',
                },
              ],
            },
            {
              path: '/accrossChain',
              name: 'accrossChain',
              icon: 'swap',
              // component: './AccrossChain',
              routes: [
                {
                  path: '/accrossChain/regist-record',
                  name: 'registRecord',
                  component: './AccrossChain/RegistRecord',
                },
                {
                  path: '/accrossChain/config',
                  name: 'config',
                  component: './AccrossChain/AccrossConfig',
                },
                {
                  path: '/accrossChain/regist-record/details/:id',
                  hideInMenu: true,
                  component: './AccrossChain/RegistRecord/components/DetailsPage',
                },
                {
                  path: '/accrossChain/anchor-nodes',
                  name: 'anchorNodes',
                  component: './AccrossChain/AnchorNodes',
                },
                {
                  path: '/accrossChain/submit-fee',
                  name: 'submitFee',
                  component: './AccrossChain/AnchorNodes/Fee',
                },
                {
                  path: '/accrossChain/config-signature',
                  name: 'configSignature',
                  component: './AccrossChain/AnchorNodes/ConfigSignature',
                },
                {
                  path: '/accrossChain/add-reward',
                  name: 'issueSignature',
                  component: './AccrossChain/AnchorNodes/AddReward',
                },
                {
                  path: '/accrossChain/anchor-nodes/details/:ID',
                  hideInMenu: true,
                  component: './AccrossChain/AnchorNodes/components/DetailsPage',
                },
                // {
                //   path: '/accrossChain/task',
                //   name: 'task',
                //   component: './AccrossChain/Task',
                // },
                {
                  path: '/accrossChain/retroactive',
                  name: 'retroactive',
                  component: './AccrossChain/Retroactive',
                },
                {
                  path: '/accrossChain/punish',
                  name: 'punish',
                  component: './AccrossChain/AnchorNodes/Punish',
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
              icon: 'wallet',
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
