import adminManageService from '@/services/adminManage'

export default {
  namespaced: true,
  state: {
    accountTotal: 0,
    accounts: [],
    roleTotal: 0,
    roles: [],
    menuTotal: 0,
    menus: [],
    roleStatusMap: {
      '0': '禁用',
      '1': '启用'
    },
    menuStatusMap: {
      '0': '禁用',
      '1': '启用'
    },
    menuVisibleMap: {
      '0': '隐藏',
      '1': '可见'
    },
    requireAuthMap: {
      '0': '否',
      '1': '是'
    }
  },
  getters: {
    accountTotal: state => state.accountTotal,
    accounts: state => state.accounts,
    roleTotal: state => state.roleTotal,
    roles: state => state.roles,
    roleStatusMap: state => state.roleStatusMap,
    menuTotal: state => state.menuTotal,
    menus: state => state.menus,
    menuStatusMap: state => state.menuStatusMap,
    menuVisibleMap: state => state.menuVisibleMap,
    requireAuthMap: state => state.requireAuthMap
  },
  mutations: {},
  actions: {
    async getAccountAllPage(cxt, params) {
      const res = await adminManageService.getAccountAllPage(params)
      cxt.state.accounts = res.data.items
      cxt.state.accountTotal = res.data.totalCount
      return res.data
    },
    async getAccount(cxt, params) {
      const res = await adminManageService.getAccount(params)
      return res.data
    },
    async createOrUpdateAccount(cxt, params) {
      const res = await adminManageService.createOrUpdateAccount(params)
      return res.data
    },
    async getRoleAllPage(cxt, params) {
      const res = await adminManageService.getRoleAllPage(params)
      cxt.state.roles = res.data.items
      cxt.state.roleTotal = res.data.totalCount
      return res.data
    },
    async getRole(cxt, params) {
      const res = await adminManageService.getRole(params)
      return res.data
    },
    async getRoleAll(cxt, params) {
      const res = await adminManageService.getRoleAll(params)
      return res.data
    },
    async createOrUpdateRole(cxt, params) {
      const res = await adminManageService.createOrUpdateRole(params)
      return res.data
    },
    async createOrUpdateRoleMenu(cxt, params) {
      const res = await adminManageService.createOrUpdateRoleMenu(params)
      return res.data
    },
    async getMenuAllPage(cxt, params) {
      const res = await adminManageService.getMenuAllPage(params)
      console.log('res', res)
      cxt.state.menus = res.data.items
      cxt.state.menuTotal = res.data.totalCount
      return res.data
    },
    async getMenu(cxt, params) {
      const res = await adminManageService.getMenu(params)
      return res.data
    },
    async getMenuAllTree(cxt, params) {
      const res = await adminManageService.getMenuAllTree(params)
      return res.data
    },
    async createOrUpdateMenu(cxt, params) {
      const res = await adminManageService.createOrUpdateMenu(params)
      return res.data
    }
  }
}
