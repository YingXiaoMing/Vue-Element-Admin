/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const healthy = {
  path: '/healthy1',
  component: Layout,
  redirect: '/healthy/examination',
  name: 'healthy1',
  meta: {
    title: '设备管理',
    icon: 'fa-cc-diners-club'
  },
  children: [{
    path: 'equipment',
    component: () => import('@/views/healthy/equipment'),
    name: 'equipment',
    meta: {
      title: '设备到期记录表',
      icon: 'fa-hand-o-left'
    }
  },
  {
    path: 'rentManager',
    component: () => import('@/views/healthy/rentManager'),
    name: 'rentManager',
    meta: {
      title: '租赁设备管理',
      icon: 'fa-shower',
    }
  },
  {
    path: 'queryInfo',
    component: () => import('@/views/healthy/queryInfo'),
    name: 'queryInfo',
    meta: {
      title: '查询统计',
      icon: 'fa-cc-visa'
    }
  }
  ]
}

export default healthy
