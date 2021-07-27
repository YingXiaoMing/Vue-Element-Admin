import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'

import './styles/element-variables.scss'
import 'viewerjs/dist/viewer.css'

import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import VueClipboard from 'vue-clipboard2'
import Viewer from 'v-viewer'
import Print from 'vue-print-nb'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(VueClipboard)
Vue.use(Viewer)
Vue.use(Print)

Vue.use(Element, {
  size: Cookies.get('size') || 'mini' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
