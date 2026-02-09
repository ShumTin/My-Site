import request from '@/utils/request'

// page代表页码数，limit代表每一页显示的数量
export function getBlog(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page, limit
    }
  })
}

export function modifyBlog(blogInfo) {
  return request({
    url: `/api/blog/${blogInfo.id}`,
    method: 'put',
    data: blogInfo.data
  })
}
export function deleteBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete'
  })
}

export function publishBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}

export function findOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get'
  })
}
