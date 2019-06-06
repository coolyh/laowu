import request from '@/utils/request'

// 用户登陆
export function login(data) {
  return request({
    url: '/bmanage/User/login',
    method: 'post',
    data
  })
}

// 获取企业基本信息
export function getInfo() {
  return request({
    url: '/bmanage/user/getComInfo',
    method: 'get'
  })
}

// 用户登出
export function logout(data) {
  return request({
    url: '/bmanage/user/loginOut',
    method: 'post',
    data
  })
}

// 修改密码
export function updatePwd(data) {
  return request({
    url: '/bmanage/user/updatePwd',
    method: 'post',
    data
  })
}

// 获取公司列表
export function getCompany(data) {
  return request({
    url: '/bmanage/user/getCompany',
    method: 'post',
    data
  })
}

// 获取公司列表
export function switchCompany(data) {
  return request({
    url: '/bmanage/user/switchCompany',
    method: 'post',
    data
  })
}

// 修改邮寄地址
export function editMailAddress(data) {
  return request({
    url: '/bmanage/user/editMailAddress',
    method: 'post',
    data
  })
}

// 修改开票信息
export function editInvoice(data) {
  return request({
    url: '/bmanage/user/editInvoice',
    method: 'post',
    data
  })
}

// 获取服务商列表
export function getServiceList(data) {
  return request({
    url: '/bmanage/user/getServiceList',
    method: 'post',
    data
  })
}