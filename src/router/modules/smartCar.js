/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const smartCar = {
  path: '/carSmart',
  component: Layout,
  redirect: '/carSmart/MaterialStock',
  name: 'carSmart',
  meta: {
    title: '智能订货',
    icon: 'nested'
  },
  children: [{
    path: 'MaterialStock',
    component: () => import('@/views/carInfo/CarType'),
    name: 'MaterialStock',
    meta: {
      title: '原料库存'
    }
  },
  {
    path: 'MaterialStockDown',
    component: () => import('@/views/carInfo/CarType'),
    name: 'MaterialStockDown',
    meta: {
      title: '原料库存下限'
    }
  },
  {
    path: 'DemandPlan',
    component: () => import('@/views/carInfo/CarType'),
    name: 'DemandPlan',
    meta: {
      title: '客户需求计划'
    }
  },
  {
    path: 'SmartOrder',
    component: () => import('@/views/carInfo/CarType'),
    name: 'SmartOrder',
    meta: {
      title: '智能订货'
    }
  },
  {
    path: 'OrderStatistics',
    component: () => import('@/views/carInfo/CarType'),
    name: 'OrderStatistics',
    meta: {
      title: '订货统计'
    }
  }
  ]
}

export default smartCar
