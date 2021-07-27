/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const healthy = {
  path: '/healthy',
  component: Layout,
  redirect: '/healthy/examination',
  name: 'healthy',
  meta: {
    title: '体检统计',
    icon: 'fa-area-chart'
  },
  children: [{
    path: 'examination',
    component: () => import('@/views/healthy/examination'),
    name: 'examination',
    meta: {
      title: '体检报告',
      icon: 'fa-file-pdf-o'
    }
  },
  {
    path: 'vision',
    component: () => import('@/views/healthy/vision'),
    name: 'vision',
    meta: {
      title: '视力综合报告',
      icon: 'fa-pie-chart'
    }
  }
  ]
}

export default healthy
