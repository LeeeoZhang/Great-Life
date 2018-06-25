// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
import {getAuth} from "./utils"

const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'home2',
    isAuth:function(){
      return getAuth() && getAuth().dashboard.isAuth === 1
    },
  },
  {
    name: '图表页',
    path: '/chart',
    icon: 'chart1',
    isAuth:function(){
      return getAuth() &&  getAuth().charts.isAuth === 1
    },
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
    isAuth:function(){
      return true
    },
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
]


export { headerMenuConfig, asideMenuConfig };
