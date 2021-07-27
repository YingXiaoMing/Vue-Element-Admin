import request from '@/utils/request'

export default {
  fileWrite: () => '/api/Api/FileWrite',
  fileRead: id => request.get('/api/Api/FileRead/' + id),
  download: params => request.get('/file/download', params, 'arraybuffer'),
  delete: params => request.delete('/file', params)
}
