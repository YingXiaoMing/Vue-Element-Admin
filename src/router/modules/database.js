import Layout from '@/layout'

const dataBase = {
  path: '/database',
  component: Layout,
  redirect: '/database/area',
  name: 'dataBase',
  meta: {
    title: '基础数据',
    icon: 'fa-envelope-open'
  },
  children: [{
    path: 'area',
    component: () => import('@/views/database/area'),
    name: 'area',
    meta: {
      title: '地区字典',
      icon: 'fa-ravelry'
    }
  }, {
    path: 'program',
    component: () => import('@/views/database/program'),
    name: 'program',
    meta: {
      title: '体检项目',
      icon: 'fa-envelope-open'
    }
  }, {
    path: 'target',
    component: () => import('@/views/database/target'),
    name: 'target',
    meta: {
      title: '项目指标',
      icon: 'fa-thermometer-4'
    }
  }, {
    path: 'banji',
    component: () => import('@/views/database/class'),
    name: 'banji',
    meta: {
      title: '班级字典',
      icon: 'fa-renren'
    }
  }, {
    path: 'school',
    component: () => import('@/views/database/school'),
    name: 'school',
    meta: {
      title: '学校字典',
      icon: 'fa-hand-o-right'
    }
  }, {
    path: 'center',
    component: () => import('@/views/database/center'),
    name: 'center',
    meta: {
      title: '体检中心',
      icon: 'fa-shield'
    }
  }]
}

export default dataBase
