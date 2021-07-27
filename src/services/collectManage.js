import request from '@/utils/request'
export default {
  getCollectAll: params => request.get('/api/SysAdmin/GetCollectAll', params),
  getEnterPrises: params => request.get('/api/SysAdmin/GetEnterPrises'),
  getCollectSelect: dsName => request.get('/api/SysAdmin/GetCollectSelect/' + dsName),
  createCollect: params => request.post('/api/SysAdmin/CreateCollect', params)
}
