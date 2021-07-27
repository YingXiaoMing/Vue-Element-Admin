/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const sysManagerRouter = {
  path: '/sysManager',
  component: Layout,
  redirect: '/sysManager/adminAccount',
  name: 'sysManager',
  meta: {
    title: '系统管理',
    icon: 'fa-cog',
    userType: 1
  },
  children: [{
    path: 'adminAccount',
    component: () => import('@/views/sysManager/adminAccount/index'),
    name: 'adminAccount',
    meta: {
      title: '后台用户管理',
      icon: 'fa-user-o',
      userType: 1
    }
  }, {
    path: 'adminRole',
    component: () => import('@/views/sysManager/adminRole/index'),
    name: 'adminRole',
    meta: {
      title: '后台角色管理',
      icon: 'fa-address-book-o',
      userType: 1
    }
  }, {
    path: 'adminRole/adminRoleMenuEdit',
    component: () => import('@/views/sysManager/adminRole/adminRoleMenuEdit'),
    name: 'adminRoleMenuEdit',
    hidden: true,
    meta: {
      title: '后台角色菜单编辑',
      userType: 1
    }
  }, {
    path: 'adminMenu',
    component: () => import('@/views/sysManager/adminMenu/index'),
    name: 'adminMenu',
    meta: {
      title: '后台菜单管理',
      icon: 'fa-window-maximize',
      userType: 1
    }
  }, {
    path: 'adminMenu/adminMenuEdit',
    component: () => import('@/views/sysManager/adminMenu/adminMenuEdit'),
    name: 'adminMenuEdit',
    hidden: true,
    meta: {
      title: '后台菜单编辑',
      userType: 1
    }
  }]
}

export default sysManagerRouter
