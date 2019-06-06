import request from '@/utils/request'

// 获取公司资金表
export function getAccount(data) {
  return request({
    url: '/bmanage/user/getAccount',
    method: 'post',
    data
  })
}

// 获取公司资金日志表
export function getAccountLog(data) {
  return request({
    url: '/bmanage/User/getAccountLog',
    method: 'post',
    data
  })
}
