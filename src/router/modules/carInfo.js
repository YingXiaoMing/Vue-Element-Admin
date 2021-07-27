/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const carInfo = {
  path: '/carInfo',
  component: Layout,
  redirect: '/carInfo/CarType',
  name: 'carInfo',
  meta: {
    title: '车型信息',
    icon: 'nested'
  },
  children: [{
    path: 'CarType',
    component: () => import('@/views/carInfo/CarType'),
    name: 'CarType',
    meta: {
      title: '车型信息'
    }
  },
  {
    path: 'CarPart',
    component: () => import('@/views/carInfo/CarType'),
    name: 'CarPart',
    meta: {
      title: '零件信息'
    }
  },
  {
    path: 'CarPartType',
    component: () => import('@/views/carInfo/CarType'),
    name: 'CarPartType',
    meta: {
      title: '车型零件对应'
    }
  },
  {
    path: 'PartCount',
    component: () => import('@/views/carInfo/CarType'),
    name: 'PartCount',
    meta: {
      title: '零件统计'
    }
  },
  {
    path: 'PartDown',
    component: () => import('@/views/carInfo/CarType'),
    name: 'PartDown',
    meta: {
      title: '零件库存下限'
    }
  }
  ]
}

export default carInfo
