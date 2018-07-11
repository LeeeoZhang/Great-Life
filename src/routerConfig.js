// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import Loadable from 'react-loadable'
import Charts from './pages/Charts'
import Portlets from './pages/Portlets'
import Terms from './pages/Terms'
import Result from './pages/Result'
import Fail from './pages/Fail'
import ServerError from './pages/ServerError'
import Forbidden from './pages/Forbidden'
import Empty from './pages/Empty'
import List from './pages/List'
import CardList from './pages/CardList'
import NotFound from './pages/NotFound'
import LoadingIndicator from '@/components/LoadingIndicator'

//代码分割
const HeaderAsideFooterLayout = Loadable({
  loader: () => import('./layouts/HeaderAsideFooterLayout'),
  loading: LoadingIndicator,
})
const BlankLayout = Loadable({
  loader: () => import('./layouts/BlankLayout'),
  loading: LoadingIndicator,
})
const Login = Loadable({
  loader: () => import('./pages/Login'),
  loading: LoadingIndicator,
})
const BlankComponent = Loadable({
  loader: () => import('@/components/BlankComponent'),
  loading: LoadingIndicator,
})
const Account = Loadable({
  loader: () => import('./pages/Account'),
  loading: LoadingIndicator,
})
const Article = Loadable({
  loader: () => import('./pages/Article'),
  loading: LoadingIndicator,
})
const Merchant = Loadable({
  loader: () => import('./pages/Merchant'),
  loading: LoadingIndicator,
})
const Shop = Loadable({
  loader: () => import('./pages/Shop'),
  loading: LoadingIndicator,
})

const BasicTable = Loadable({
  loader: () => import('./pages/BasicTable'),
  loading: LoadingIndicator,
})
const TableDisplay = Loadable({
  loader: () => import('./pages/TableDisplay'),
  loading: LoadingIndicator,
})

const routerConfig = [
  {
    path: '/table',
    layout: HeaderAsideFooterLayout,
    component: BasicTable,
    children: [
      {
        path: 'basic-table',
        layout: HeaderAsideFooterLayout,
        component: BasicTable,
      },
      {
        path: 'table-display',
        layout: HeaderAsideFooterLayout,
        component: TableDisplay,
      },
    ],
  },
  {
    path: '/login',
    layout: BlankLayout,
    component: Login,
  },
  {
    path: '/account',
    layout: HeaderAsideFooterLayout,
    component: Account,
  },
  {
    path: '/article',
    layout: HeaderAsideFooterLayout,
    component: Article,
  },
  {
    path: '/merchant',
    layout: HeaderAsideFooterLayout,
    component: Merchant,
  },
  {
    path: '/shop',
    layout: HeaderAsideFooterLayout,
    component: Shop,
  },
  {
    path: '/portlets',
    layout: HeaderAsideFooterLayout,
    component: Portlets,
    children: [
      {
        path: 'base',
        layout: HeaderAsideFooterLayout,
        component: Portlets,
      },
      {
        path: 'terms',
        layout: HeaderAsideFooterLayout,
        component: Terms,
      },
    ],
  },
  {
    path: '/',
    layout: HeaderAsideFooterLayout,
    component: BlankComponent,
  },
  {
    path: '/list',
    layout: HeaderAsideFooterLayout,
    component: List,
    children: [
      {
        path: 'article-list',
        layout: HeaderAsideFooterLayout,
        component: List,
      },
      {
        path: 'card-list',
        layout: HeaderAsideFooterLayout,
        component: CardList,
      },
    ],
  },
  {
    path: '/exception',
    layout: HeaderAsideFooterLayout,
    component: ServerError,
    children: [
      {
        path: '500',
        layout: HeaderAsideFooterLayout,
        component: ServerError,
      },
      {
        path: '403',
        layout: HeaderAsideFooterLayout,
        component: Forbidden,
      },
      {
        path: '204',
        layout: HeaderAsideFooterLayout,
        component: Empty,
      },
      {
        path: '404',
        layout: HeaderAsideFooterLayout,
        component: NotFound,
      },
    ],
  },
  {
    path: '/result',
    layout: HeaderAsideFooterLayout,
    component: Result,
    children: [
      {
        path: 'success',
        layout: HeaderAsideFooterLayout,
        component: Result,
      },
      {
        path: 'fail',
        layout: HeaderAsideFooterLayout,
        component: Fail,
      },
    ],
  },
  {
    path: '/chart',
    layout: HeaderAsideFooterLayout,
    component: Charts,
    children: [
      {
        path: 'chart-list',
        layout: HeaderAsideFooterLayout,
        component: Charts,
      },
    ],
  },
  {
    path: '*',
    layout: HeaderAsideFooterLayout,
    component: NotFound,
  },
]

export default routerConfig
