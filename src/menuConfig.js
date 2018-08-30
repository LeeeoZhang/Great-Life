// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '概况',
    path: '/',
    icon: 'chart',
  },
  {
    name: '账号管理',
    path: '/account',
    icon: 'person',
    isAuth: () => true,
  },
  {
    name: '文章管理',
    path: '/article',
    icon: 'content',
  },
  {
    name: '店铺管理',
    path: '/shop',
    icon: 'shop',
  },
  {
    name: '商品管理',
    path: '/goods',
    icon: 'item',
  },
  {
    name: '首页装修管理',
    path: '/homeRepair',
    icon: 'repair',
  },
  {
    name: '订单管理',
    path: '/order',
    icon: 'ul-list',
  },
  {
    name: '结算中心',
    path: '/balanceCenter',
    icon: 'ul-list',
  },
  {
    name: '数据中心',
    path: '/dataCenter',
    icon: 'ul-list',
  },
  {
    name: '配置中心',
    path: '/configCenter',
    icon: 'light',
  },
];

export { headerMenuConfig, asideMenuConfig };
