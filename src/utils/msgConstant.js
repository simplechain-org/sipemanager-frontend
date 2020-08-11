// case 18001:
//       msg = '无效的私钥';
//       break;
//     case 18002:
//       msg = '钱包密码错误';
//       break;
//     case 18003:
//       msg = '根据私钥产生钱包地址出错';
//       break;
//     case 18004:
//       msg = 'keystore文件格式错误';
//       break;
//     case 18005:
//       msg = '无效助记词';
//       break;
//     case 18006:
//       msg = '根据私钥生成keystore文件时出错';
//       break;
//     case 18007:
//       msg = '钱包地址已经存在';
//       break;
//     case 18008:
//       msg = '钱包id对应的记录不存在，请确认钱包id的值';
//       break;
//     case 12005:
//       msg = '跨链合约abi检查错误';
//       break;

export const msgConstant = {
  10001: '链信息保存出错',
  10002: '更新链信息出错',
  10003: '链id对应的记录不存在',
  10004: '链id对应的合约记录不存在',
  10005: '链下还存在节点，不能删除',
  10006: '链下还存在相应的合约实例',
  10007: '链注册出错',
  10008: '链已经注册',
  11001: '节点id对应的记录不存在',
  12001: '合约调用出错',
  12002: '合约还在使用中，不可以删除',
  12003: '合约id对应的合约不存在',
  12004: '部署合约出错',
  12005: '跨链合约Abi检查出错',
  15001: '锚定节点签名功能已被禁用',
  15002: '当前已经暂停的锚定节点才能恢复',
  15003: '重复暂停同一个锚定节点',
  15004: 'token扣减数量非法',
  17001: '锚定节点不存在',
  17002: '指定的锚定节点不在所选的节点所在的链上',
  18001: '无效的私钥',
  18002: '钱包密码错误',
  18003: '根据私钥产生钱包地址出错',
  18004: 'keystore文件格式错误',
  18005: '无效助记词',
  18006: '根据私钥生成keystore文件时出错',
  18007: '钱包地址已经存在',
  18008: '钱包id对应的记录不存在，请确认钱包id的值',
  19001: '请求参数错误',
  19002: '锚定节点地址不合法',
  19300: '数据库错误',
  21001: '无法获取注册的锚定节点地址',
  21002: '无效的ChainID查询',
};
