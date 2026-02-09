import request from '@/utils/request'

// page代表页码数，limit代表每一页显示的数量
export function getMessage(page = 1, limit = 20) {
  return request({
    url: '/api/message',
    method: 'get',
    params: {
      page, limit
    }
  })
}

export function delMessage(id) {
  return request({
    url: `/api/message/${id}`,
    method: 'delete'
  })
}
