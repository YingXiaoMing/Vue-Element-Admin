import axios from 'axios'
import * as local from '@/utils/local'
import router from '../router'
import store from '@/store'
import * as env from './env'
import {
  getToken
} from '@/utils/auth'

import {
  Notification,
  MessageBox,
  Message
} from 'element-ui'

let cancel
const promiseArr = {}
const CancelToken = axios.CancelToken

axios.interceptors.request.use(config => {
  // console.log('请求拦截器', config)
  // if (promiseArr[config.url]) {
  //   promiseArr[config.url]('操作取消')
  //   promiseArr[config.url] = cancel
  // } else {
  //   promiseArr[config.url] = cancel
  // }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // console.log('axios interceptors: ', response)
  let errorMessage = ''
  if (typeof response.data !== 'object') {
    return response.data
  }
  // 请求授权时异常
  if (!response.data.succeeded) {
    errorMessage = response.data.message || '系统繁忙，请稍后重试'
  }

  // 请求资源时异常
  // if (response.data.__IG && response.data.error) {
  // //如果token 过期，且有 refresh_token，则用 refresh_token 刷新 access_token
  // if(responseJson.error.message == "已拒绝为此请求授权。"){

  // }

  // //如果token 过期，清除，并跳转登录页面
  // if (responseJson.error.message == "已拒绝为此请求授权。") {
  //   store.commit(mutationTypes.SET_USER)
  //   router.replace({
  //     path: '/login',
  //     query: {
  //       redirect: router.currentRoute.fullPath
  //     },
  //   })
  //   Toast('请先登录后再操作')
  //   throw responseJson.error.detail
  // }

  // Toast(responseJson.error.detail)

  //   errorMessage = response.data.error.detail || '未知错误'
  // }

  if (errorMessage) {
    Notification({
      title: '错误',
      message: errorMessage,
      type: 'error'
    })

    return Promise.reject(response.data)
  }

  // 直接返回结果
  if (response.data.__IG) {
    return response.data.result
  } else {
    return response.data
  }
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        break
      case 401009:
        error.message = '授权超时，请重新登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    error.message = '连接到服务器失败'
  }

  Notification({
    title: '错误',
    message: error.message,
    type: 'error'
  })

  if (error.response.status == 401) {
    router.replace({
      path: '/401',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }
  // 授权超时
  if (error.response.status == 401009) {
    local.remove()
    router.replace({
      path: '/login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }

  return Promise.reject(error.response)
})

axios.defaults.baseURL = env.VUE_APP_ADMIN_API
axios.defaults.headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
axios.defaults.timeout = 10000

// 拼接参数
const formatParam = (params) => {
  if (!params) return ''

  let result = ''
  Object.keys(params).map((key, index) => {
    const val = params[key]
    if (typeof (val) != 'undefined' && val != null && val !== '') {
      result += result.length <= 0
        ? `?${key}=${val}`
        : `&${key}=${val}`
    }
  })

  return result
}

export default {
  get(url, param, responseType = 'application/json',
    timeout = 10000) {
    url += formatParam(param)
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        headers: {
          'Authorization': `bearer ${local.get('auth_token')}`
        },
        url,
        timeout,
        responseType: responseType,
        // params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(function(error) {
        reject(error)
      })
    })
  },
  post(url, param, responseType = 'application/json',
    timeout = 10000) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        headers: {
          'Authorization': `bearer ${local.get('auth_token')}`
        },
        url,
        timeout,
        responseType: responseType,
        data: param,
        // params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(function(error) {
        reject(error)
      })
    })
  },
  put(url, param, responseType = 'application/json',
    timeout = 10000) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        headers: {
          'Authorization': `bearer ${local.get('auth_token')}`
        },
        url,
        timeout,
        responseType: responseType,
        data: param,
        // params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(function(error) {
        reject(error)
      })
    })
  },
  delete(url, param, responseType = 'application/json',
    timeout = 10000) {
    url += formatParam(param)
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        headers: {
          'Authorization': `bearer ${local.get('auth_token')}`
        },
        url,
        timeout,
        responseType: responseType,
        // data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(function(error) {
        reject(error)
      })
    })
  }
}
