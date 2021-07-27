import request from '@/utils/request'
export default {
  getAccountAllPage: params => request.get('/api/AccountManage/GetAccountAllPage', params),
  getAccount: params => request.get('/api/AccountManage/GetAccount', params),
  createOrUpdateAccount: params => request.post('/api/AccountManage/CreateOrUpdateAccount', params),

  getRoleAllPage: params => request.get('/api/AccountManage/GetRoleAllPage', params),
  getRole: params => request.get('/api/AccountManage/GetRole', params),
  getRoleAll: params => request.get('/api/AccountManage/GetRoleAll', params),
  createOrUpdateRole: params => request.post('/api/AccountManage/CreateOrUpdateRole', params),
  createOrUpdateRoleMenu: params => request.post('/api/AccountManage/CreateOrUpdateRoleMenu', params),

  getMenuAllTree: params => request.get('/api/AccountManage/GetMenuAllTree', params),
  getMenuAllPage: params => request.get('/api/AccountManage/GetMenuAllPage', params),
  getMenu: params => request.get('/api/AccountManage/getMenu', params),
  createOrUpdateMenu: params => request.post('/api/AccountManage/CreateOrUpdateMenu', params)
}
