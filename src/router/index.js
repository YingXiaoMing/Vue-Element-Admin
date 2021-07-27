import Vue from 'vue'
import Router from 'vue-router'
import settings from '@/settings'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import sysManager from './modules/sysManager'
import carInfo from './modules/carInfo'
import smartCar from './modules/smartCar'
import carSet from './modules/carSet'
import healthy from './modules/healthy'
import healthy1 from './modules/healthy1'
import dataBase from './modules/database'
import school from './modules/school'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    // name: 'redirect',
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index'),
      // name: 'redirectpath',
      hidden: true,
      meta: {
        noAuth: true
      }
    }],
    meta: {
      noAuth: true
    }
  },
  {
    path: '/login',
    component: () => {
      return import('@/views/login/index')
    },
    name: 'login',
    hidden: true,
    meta: {
      noAuth: true
    }
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    name: 'authredirect',
    hidden: true,
    meta: {
      noAuth: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    name: '404',
    hidden: true,
    meta: {
      noAuth: true
    }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    name: '401',
    hidden: true,
    meta: {
      noAuth: true
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: false,
    children: [{
      path: 'home',
      component: () => import('@/views/home/index'),
      name: 'home',
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true,
        noAuth: true
      }
    }]
  },

  // carInfo,
  // smartCar,
  // carSet,
  // healthy,
  // healthy1,
  sysManager,
  // dataBase,
  // school,
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/profile/index'),
      name: 'profile',
      meta: {
        title: '个人中心',
        icon: 'user'
      }
    }]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    hidden: true,
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404',
      noAuth: true
    },
    children: [{
      path: '401',
      component: () => import('@/views/error-page/401'),
      name: 'Page401',
      meta: {
        title: '401',
        noCache: true,
        noAuth: true
      }
    }, {
      path: '404',
      component: () => import('@/views/error-page/404'),
      name: 'Page404',
      meta: {
        title: '404',
        noCache: true,
        noAuth: true
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    meta: {
      noAuth: true
    }
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
