import Layout from '@/layout'

const school = {
  path: '/schoolManage',
  component: Layout,
  name: 'schoolManage',
  redirect: '/schoolManage/banji',
  meta: {
    title: '学校管理',
    icon: 'fa-drivers-license-o'
  },
  children: [{
    path: 'banji',
    component: () => import('@/views/schoolManager/class'),
    name: 'Banji',
    meta: {
      title: '学校班级',
      icon: 'fa-meetup'
    }
  }, {
    path: 'student',
    component: () => import('@/views/schoolManager/student'),
    name: 'Student',
    meta: {
      title: '学生索引',
      icon: 'fa-address-book-o'
    }
  }]
}

export default school
