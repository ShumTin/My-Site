import request from '@/utils/request'

// page代表页码数，limit代表每一页显示的数量
export function getComment(page = 1, limit = 20) {
  return request({
    url: '/api/comment',
    method: 'get',
    params: {
      page, limit
    }
  })
}

export function delComment(id) {
  return request({
    url: `/api/comment/${id}`,
    method: 'delete'
  })
}
