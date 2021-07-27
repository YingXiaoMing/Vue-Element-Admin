import request from '@/utils/request'
export default {
  login: params => request.post('/api/accountmanage/login', params),
  updatePassword: params => request.post('/account/updatePassword', params),
  resetPassword: params => request.get('/account/resetPassword', params),
  updateStatus: params => request.get('/account/updateStatus', params),
  getPage: params => request.get('/accounts', params),
  createOrUpdate: params => request.post('/account', params)
}
