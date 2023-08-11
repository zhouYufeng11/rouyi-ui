import request from '@/utils/request'

export function listMatter(query) {
  return request({
    url: '/dzda/template/list',
    method: 'get',
    params: query
  })
}

export function addMatter(data) {
  return request({
    url: '/dzda/template',
    method: 'post',
    data: data
  })
}
