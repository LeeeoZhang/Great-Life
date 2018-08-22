// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import Loadable from 'react-loadable'
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
// const Merchant = Loadable({
//   loader: () => import('./pages/Merchant'),
//   loading: LoadingIndicator,
// })
const Shop = Loadable({
  loader: () => import('./pages/Shop'),
  loading: LoadingIndicator,
})
const Goods = Loadable({
  loader: () => import('./pages/Goods'),
  loading: LoadingIndicator,
})
const Result = Loadable({
  loader: () => import('./pages/Result'),
  loading: LoadingIndicator,
})
const Fail = Loadable({
  loader: () => import('./pages/Fail'),
  loading: LoadingIndicator,
})
const ServerError = Loadable({
  loader: () => import('./pages/ServerError'),
  loading: LoadingIndicator,
})
const Forbidden = Loadable({
  loader: () => import('./pages/Forbidden'),
  loading: LoadingIndicator,
})
const Empty = Loadable({
  loader: () => import('./pages/Empty'),
  loading: LoadingIndicator,
})
const NotFound = Loadable({
  loader: () => import('./pages/NotFound'),
  loading: LoadingIndicator,
})
const HomeRepair = Loadable({
  loader: () => import('./pages/HomeRepair'),
  loading: LoadingIndicator,
})
const Order = Loadable({
  loader: () => import('./pages/Order'),
  loading: LoadingIndicator,
})
const BalanceCenter = Loadable({
  loader: () => import('./pages/BalanceCenter'),
  loading: LoadingIndicator,
})

const routerConfig = [
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
  // {
  //   path: '/merchant',
  //   layout: HeaderAsideFooterLayout,
  //   component: Merchant,
  // },
  {
    path: '/shop',
    layout: HeaderAsideFooterLayout,
    component: Shop,
  },
  {
    path: '/goods',
    layout: HeaderAsideFooterLayout,
    component: Goods,
  },
  {
    path: '/',
    layout: HeaderAsideFooterLayout,
    component: BlankComponent,
  },
  {
    path: '/homeRepair',
    layout: HeaderAsideFooterLayout,
    component: HomeRepair,
  },
  {
    path: '/order',
    layout: HeaderAsideFooterLayout,
    component: Order,
  },
  {
    path: '/balanceCenter',
    layout: HeaderAsideFooterLayout,
    component: BalanceCenter,
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
    path: '*',
    layout: HeaderAsideFooterLayout,
    component: NotFound,
  },
]

export default routerConfig
