import request from '../utils/request'

export function a() {
  return request({
    url: 'dzda/gen/list',
    method: 'get'
  })
}

export function admanage(data) {
  return request({
    url: 'dzda/damanage',
    method: 'post',
    data: data
  })
}

