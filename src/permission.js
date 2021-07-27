import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken,
  getAccount
} from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import {
  access
} from 'fs'
import * as local from '@/utils/local'

NProgress.configure({
  showSpinner: false
})
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
const noRedirectList = ['401', '404'] // 不需要重定向的页面

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()
  const account = getAccount()
  // let roles = account && account.roles
  // let hasRoles = !!(roles && roles.length > 0)
  const userType = local.get('auth_userType')
  const menus = local.get('auth_menus')

  const routes = await store.dispatch('permission/generateRoutes')
  const isSelf = store.getters['settings/isSelf']

  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else if ((to.path === '/' || to.path === '/home') && !isSelf) {
      let _path = ''

      if (routes && routes.length > 0) {
        if (routes[0].path) _path = routes[0].path
        else if (routes[0].children && routes[0].children.length > 0) _path = routes[0].children[0].path
      }

      if (_path.length <= 0) next()
      else next(_path)
    } else {
      // if (hasRoles) {
      let hasPermission = false
      // if (!to.meta || !to.meta.roles || to.meta.roles.length <= 0)
      //   next()
      // else {
      //   roles.forEach(r => {
      //     if (to.meta.roles) {
      //       let flag = !!to.meta.roles.find(a => r == a)
      //       if (flag) hasPermission = true
      //     }
      //   });

      //   // 没有权限则跳转 401
      //   if (hasPermission) next()
      //   else next("/401")
      // }

      // 指定不验证权限
      if (to.meta.noAuth) hasPermission = true
      else if (userType == 1 && to.meta && to.meta.userType) {
        hasPermission = to.meta.userType == userType
      } else {
        if (menus != undefined && menus != 'undefined') {
          const menu = menus.find(m => m.code == to.name)
          // if (menu) hasPermission = true
          // 权限测试(删除) 真的有劲
          hasPermission = true
        }
      }

      // 没有权限则跳转 401
      if (hasPermission) next()
      else next('/401')

      // } else if (!hasRoles) {
      //   try {
      //     // get user info
      //     // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
      //     // const {
      //     //   roles
      //     // } = await store.dispatch('user/getInfo')
      //     // generate accessible routes map based on roles
      //     let accessRoutes = await store.dispatch('permission/generateRoutes')

      //     // dynamically add accessible routes
      //     router.addRoutes(accessRoutes)

      //     // hack method to ensure that addRoutes is complete
      //     // set the replace: true, so the navigation will not leave a history record
      //     next({
      //       ...to,
      //       replace: true
      //     })
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //   }
      // } else {
      //   next()
      // }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1 || noRedirectList.indexOf(to.name) !== -1) next()
    else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
