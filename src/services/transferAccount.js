import request from '@/utils/request'
export default {
  /** 期末结转 */
  VoucherEnd: params => request.get('/api/Voucher/VoucherEnd', params),
  /** 取消期末结转 */
  VoucherEndCancel: params => request.get('/api/Voucher/VoucherEndCancel', params),
  /** 结转本年利润损益 */
  VoucherYearProfit: params => request.get('/api/Voucher/VoucherYearProfit', params),
  /** 获取但其会计期间/凭证号 */
  GetCurrentPeriodAll: params => request.get('/api/Voucher/GetCurrentPeriodAll', params),
  /** 新增凭证 */
  CreateVoucher: params => request.get('/api/Voucher/CreateVoucher', params),
  /** 全审全记 */
  VoucherFull: params => request.get('/api/Voucher/VoucherFull', params),
  createOrUpdate: params => request.post('/account', params)
}
