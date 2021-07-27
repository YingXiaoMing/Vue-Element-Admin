import {
  // asyncRoutes,
  constantRoutes
} from '@/router'
import * as local from '@/utils/local'

/**
 * Use meta.role to determine if the current user has permission
 * @param route
 */
function hasPermission(route) {
  // console.log('route:', route)
  // if (route.meta && route.meta.roles) {
  //   if (roles && roles.length > 0)
  //     return roles.some(role => route.meta.roles.includes(role))
  //   else return false
  // } else {
  //   return true
  // }
  let hasPermission = false

  const userType = local.get('auth_userType')
  const menus = local.get('auth_menus')
  if (userType == 1 && route.meta && route.meta.userType) {
    hasPermission = route.meta.userType == userType
  } else {
    if (menus == undefined || menus == 'undefined') return false

    const menu = menus.find(m => m.code == route.name)
    if (menu) hasPermission = true
  }

  // 路由控制  真的有劲
  hasPermission = true

  // else {
  //   if (!route.meta || !route.meta.roles || route.meta.roles.length <= 0)
  //     hasPermission = true
  // }

  return hasPermission
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 */
export function filterAsyncRoutes(routes) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: []
}

const getters = {
  permission_routes: state => {
    return state.routes
  }
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  generateRoutes(ctx) {
    return new Promise(resolve => {
      let accessedRoutes
      // if (roles && roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      accessedRoutes = filterAsyncRoutes(constantRoutes)
      // }
      console.log('accessedRoutes: ', accessedRoutes)
      ctx.commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
