import * as local from '@/utils/local'
import accountService from '../../services/account'

const state = {
  total: 0,
  accounts: [],
  accountStatusMap: {
    '100': '启用',
    '200': '锁定',
    '300': '停用',
    '900': '注销'
  }
}
const getters = {
  accountStatusMap: state => state.accountStatusMap,
  total: state => state.total,
  accounts: state => state.accounts,
  // auth_token: state => local.get('auth_token') || '',
  // auth_account: state => local.get('auth_account') || undefined
  token: state => {
    return local.get('auth_token')
  },
  avatar: state => '',
  name: state => {
    const account = local.get('auth_account')
    return account ? account.name : ''
  },
  introduction: state => '',
  roles: state => {
    const account = local.get('auth_account')
    return account ? account.roles : ''
  }
}
const mutations = {
  SET_AUTH: (state, payload) => {
    if (!payload.token) {
      return
    }
    local.set('auth_account', payload.account)
    local.set('auth_token', payload.token)
    local.set('auth_menus', payload.menus)
    local.set('auth_userType', payload.userType)
    local.set('auth_userName', payload.userName)
  },
  SET_LOGOUT: (state, payload) => {
    local.remove()
  },
  SET_ACCOUNTS: (state, payload) => {
    console.log('mutation set account: ', payload)
  }
}
const actions = {
  async login(ctx, params) {
    params = Object.assign(params, {
      domain: window.location.host
    })
    const res = await accountService.login(params)
    ctx.commit('SET_AUTH', res.data)

    console.log('login res: ', res.data)
    return res.data
  },
  async simulateLogin(ctx, params) {
    const data = {
      account: 'xiaoMing',
      token: 'test',
      userType: 0,
      menus: [{
        code: 'home'
      }]
    }
    ctx.commit('SET_AUTH', data)
    return data
  },

  async logout(ctx, params) {
    ctx.commit('SET_LOGOUT')
    return true
  },
  async updatePassword(ctx, params) {
    const res = await accountService.updatePassword(params)
    return res
  },
  async resetPassword(ctx, params) {
    const res = await accountService.resetPassword(params)
    return res
  },
  async updateStatus(ctx, params) {
    const res = await accountService.updateStatus(params)
    return res
  },

  async getPage({
    commit
  }, params) {
    const res = await accountService.getPage(params)
    return res
  },
  async createOrUpdate(ctx, params) {
    const res = await accountService.createOrUpdate(params)
    return res
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
