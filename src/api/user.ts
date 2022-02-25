import request from '@/service/index'

export const getUserInfo = () => {
  return request({
    url: '/getUserInfo',
    method: 'GET'
  })
}
