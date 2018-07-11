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
  {
    name: '图表页',
    path: '/chart',
    icon: 'chart1',
    children: [
      {
        name: '常用图表',
        path: '/chart/chart-list',
      },
    ],
  },
  {
    name: '表格页',
    path: '/table',
    icon: 'table',
    children: [
      {
        name: '基础表格',
        path: '/table/basic-table',
      },
      {
        name: '常用竖向表格',
        path: '/table/table-display',
      },
    ],
  },
  {
    name: '列表页',
    path: '/list',
    icon: 'ul-list',
    children: [
      {
        name: '搜索列表',
        path: '/list/article-list',
      },
      {
        name: '卡片列表',
        path: '/list/card-list',
      },
    ],
  },
  {
    name: '内容页',
    path: '/portlets',
    icon: 'publish',
    children: [
      {
        name: '基础详情页',
        path: '/portlets/base',
      },
      {
        name: '条款协议页',
        path: '/portlets/terms',
      },
    ],
  },
  {
    name: '结果页',
    path: '/result',
    icon: 'result',
    children: [
      {
        name: '成功',
        path: '/result/success',
      },
      {
        name: '失败',
        path: '/result/fail',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
