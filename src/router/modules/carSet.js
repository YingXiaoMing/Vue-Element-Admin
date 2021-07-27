/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const carSet = {
  path: '/carSet',
  component: Layout,
  redirect: '/carSet/LeftRightSet',
  name: 'carSet',
  meta: {
    title: '智能排产',
    icon: 'nested',
    userType: 0
  },
  children: [{
    path: 'LeftRightSet',
    component: () => import('@/views/carInfo/CarType'),
    name: 'LeftRightSet',
    meta: {
      title: '左右切边设置'
    }
  },
  {
    path: 'LosSet',
    component: () => import('@/views/carInfo/CarType'),
    name: 'LosSet',
    meta: {
      title: '切刀损耗设置'
    }
  },
  {
    path: 'SmartLabor',
    component: () => import('@/views/carInfo/CarType'),
    name: 'SmartLabor',
    meta: {
      title: '智能排产'
    }
  },
  {
    path: 'SmartMaterial',
    component: () => import('@/views/carInfo/CarType'),
    name: 'SmartMaterial',
    meta: {
      title: '智能下料'
    }
  }
  ]
}

export default carSet
