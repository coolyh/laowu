import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },

  {
    path: '/bd',
    component: Layout,
    meta: {
      title: '业务发放',
      icon: 'tree',
      breadcrumb: false 
    },
    children: [
      {
        path: 'businessDistribution',
        name: 'BusinessDistribution',
        component: () => import('@/views/businessDistribution/index'),
        meta: { title: '业务发放' }
      },
      {
        path: 'issueWater',
        name: 'IssueWater',
        component: () => import('@/views/issueWater/index'),
        meta: { title: '发放流水' }
      },
      {
        path: 'uploadSalary',
        name: 'UploadSalary',
        hidden: true, // 不在侧边栏线上
        component: () => import('@/views/uploadSalary/index'),
        meta: { title: '新增订单' }
      },
    ]
  },

  {
    path: '/recharge',
    component: Layout,
    meta: {
      title: '资金管理',
      icon: 'money',
      breadcrumb: false
    },
    children: [
      {
        path: 'rechargeIndex',
        name: 'RechargeIndex',
        component: () => import('@/views/rechargeIndex/index'),
        meta: { title: '充值记录' }
      },
      {
        path: 'balanceDetail',
        name: 'BalanceDetail',
        component: () => import('@/views/balanceDetail/index'),
        meta: { title: '余额明细' }
      },
      {
        path: 'fundDetail',
        name: 'FundDetail',
        component: () => import('@/views/fundDetail/index'),
        meta: { title: '资金明细' }
      },
      {
        path: 'topupList',
        name: 'TopupList',
        component: () => import('@/views/topupList/index'),
        meta: { title: '充值申请' }
      },
    ]
  },

  {
    path: '/settled',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '账单下载',
      icon: 'download',
      breadcrumb: false
    },
    children: [
      {
        path: 'billList',
        name: 'BillList',
        component: () => import('@/views/billList/index'),
        meta: { title: '流水账单' }
      }
    ]
  },

  {
    path: '/invoice',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '发票管理',
      icon: 'invoice',
      breadcrumb: false
    },
    children: [
      {
        path: 'invoiceDetail',
        name: 'InvoiceDetail',
        component: () => import('@/views/invoiceDetail/index'),
        meta: { title: '发票明细' }
      }
    ]
  },

  {
    path: '/eContract',
    component: Layout,
    meta: {
      title: '电子签约',
      icon: 'signing',
      breadcrumb: false
    },
    children: [
      {
        path: 'signManager',
        name: 'SignManager',
        component: () => import('@/views/signManager/index'),
        meta: { title: '发起签约' }
      },
      {
        path: 'record',
        name: 'Record',
        component: () => import('@/views/record/index'),
        meta: { title: '签约记录' }
      },
    ]
  },

  {
    path: '/developer',
    component: Layout,
    meta: {
      title: '开发者模式',
      icon: 'developer',
      breadcrumb: false
    },
    children: [
      {
        path: 'appList',
        name: 'AppList',
        component: () => import('@/views/appList/index'),
        meta: { title: '开发者模式' }
      }
    ]
  },

  {
    path: '/setup',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '系统配置',
      icon: 'syetem',
      breadcrumb: false
    },
    children: [
      {
        path: 'companyMessage',
        name: 'CompanyMessage',
        component: () => import('@/views/companyMessage/index'),
        meta: { title: '企业信息' }
      }
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
