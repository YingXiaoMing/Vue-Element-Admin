import request from '@/utils/request'
export default {
  getProvince: params => request.get('/api/Metadata/Province'),
  getCity: code => request.get('/api/Metadata/province/' + code + '/city'),
  getRegion: code => request.get('/api/Metadata/city/' + code + '/region'),
  getSchool: code => request.get('/api/Metadata/region/' + code + '/School'),
  getClass: code => request.get('/api/Metadata/school/' + code + '/Class'),
  getStudent: code => request.get('/api/Metadata/class/' + code + '/Student'),

  getReportInfo: params => request.get('/api/Exam/', params),
  getReportExam: params => request.get('/api/Exam/Fetch', params),
  getFetchReport: params => request.get('/api/Exam/FetchReport', params),
  getExportExcelList: params => request.get('/api/Exam/ExportExcelList', params, 'blob'),
  getExportExcelReport: params => request.get('/api​/Exam​/ExportExcelReport', params, 'blob'),

  postVision: params => request.post('/api/Vision', params),
  putVision: params => request.put('/api/Vision', params),
  getVisionFetchReport: params => request.get('/api/Vision/FetchReport', params),
  getVisionExportExcelReport: params => request.get('/api/Vision/ExportExcelReport', params, 'blob'),

  getFetchDeviceTree: () => request.get('/api/Device/FetchDeviceTree'), // 代理商设备树
  getFetchDeviceRent: params => request.get('/api/Device/FetchDeviceRent', params), // 分页查询设备租赁记录
  postDeviceAudit: params => request.post('/api/Device/Audit', params), // 设备归还时审计记录
  postDevice: params => request.post('/api/Device', params), // 提交设备租赁记录
  getDevice: id => request.get('/api/Device/' + id), // 查询
  getFetchDeviceExpire: params => request.get('/api/Device/FetchDeviceExpire', params), // 查询即将到期设备记录

  postFileWrit: params => request.post('/api/Api/FileWrit', params), // 保存文件
  getFileRead: id => request.get('/api/Api/FileRead/' + id) // 读取文件

}
