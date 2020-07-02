import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = ProSettings & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890FF',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: '区块链管理系统',
  pwa: false,
  iconfontUrl: '',
};

export type { DefaultSettings };

export default proSettings;
