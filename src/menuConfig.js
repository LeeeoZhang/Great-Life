// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [];

const asideMenuConfig = [
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
    name: '商家管理',
    path: '/merchant',
    icon: 'fans',
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
];

export { headerMenuConfig, asideMenuConfig };
