import request from '@/utils/request'

// 查询档案管理列表
export function listManage(query) {
  return request({
    url: '/dzda/damanage/list',
    method: 'get',
    params: query
  })
}

// 查询事项管理列表
export function getlistManage(query) {
  return request({
    url: '/dzda/manage/list',
    method: 'get',
    params: query
  })
}

// 新增事项管理
export function addNewManage(data) {
  return request({
    url: '/dzda/manage',
    method: 'post',
    data: data
  })
}

// 新增事项管理
export function changeManage(data) {
  return request({
    url: '/dzda/manage',
    method: 'put',
    data: data
  })
}

// 查询事项管理详细信息
// export function getManageInfo(id) {
//   return request({
//     url: '/dzda/manage/list/' + id,
//     method: 'get'
//   })
// }

// 查询档案管理详细
export function getManage(id) {
  return request({
    url: '/dzda/manage/' + id,
    method: 'get'
  })
}

// 新增档案管理
export function addManage(data) {
  return request({
    url: '/dzda/manage',
    method: 'post',
    data: data
  })
}

// 修改档案管理
export function updateManage(data) {
  return request({
    url: '/dzda/damanage',
    method: 'put',
    data: data
  })
}

// 删除档案管理
export function delManage(id) {
  return request({
    url: '/dzda/manage/' + id,
    method: 'delete'
  })
}

// 整改记录
export function rectify(data) {
  return request({
    url: '/dzda/rectify/list' + `?daId=${data}`,
    method: 'get'
  })
}

// 借阅申请 dzda/apply
export function addLookManage(data) {
  return request({
    url: '/dzda/apply',
    method: 'post',
    data: data
  })
}

// 借阅申请列表 dzda/apply
export function getApplyList(query) {
  return request({
    url: '/dzda/apply/list',
    method: 'get',
    params: query
  })
}

// 发起整改 rectify
export function addRectify(data) {
  return request({
    url: '/dzda/rectify',
    method: 'post',
    data: data
  })
}

// 查询申请记录列表
export function applyList(query) {
  return request({
    url: '/dzda/rectify/list',
    method: 'get',
    params: query
  })
}

// 借阅审批记录 exam
export function addExam(data) {
  return request({
    url: '/dzda/rectify',
    method: 'post',
    data: data
  })
}
// 查询借阅审批记录 exam
export function examList(query) {
  return request({
    url: '/dzda/exam/list',
    method: 'get',
    params: query
  })
}
// 查询借阅审批详细信息
export function getexamInfo(id) {
  return request({
    url: '/dzda/exam/' + id,
    method: 'get'
  })
}

// 借阅审批记录
export function changeexamInfo(data) {
  return request({
    url: '/dzda/exam',
    method: 'put',
    data: data
  })
}

export function getverifyInfo(data) {
  return request({
    url: '/dzda/verify/getByDaId' + `?daId=${data}`,
    method: 'get'
  })
}

// 查询审核审批事件管理
export function eventList(query) {
  return request({
    url: '/dzda/event/list',
    method: 'get',
    params: query
  })
}

// 发布审核
export function addverify(daId) {
  return request({
    url: '/dzda/verify/startVeriFy/' + daId,
    method: 'get'
  })
}

// 编辑审核流程
export function changeFlow(data) {
  return request({
    url: '/dzda/flow',
    method: 'put',
    data: data
  })
}
// system/dept/treeList
export function abc() {
  return request({
    url: '/system/dept/treeList',
    method: 'get'
  })
}

// 查询签章用户
export function signatureList(query) {
  return request({
    url: '/dzda/signature/list',
    method: 'get',
    params: query
  })
}

// 新建签章用户
export function addSignature(data) {
  return request({
    url: '/dzda/signature',
    method: 'post',
    data: data
  })
}

// 事项类型
export function systemDict() {
  return request({
    url: '/system/dict/data/list?pageNum=1&pageSize=50&dictType=tb_item_type',
    method: 'get'
  })
}

// 容缺归档 dzda/dafile
export function addDafile(data) {
  return request({
    url: '/dzda/dafile',
    method: 'post',
    data: data
  })
}

// 查询档案管理文件列表
export function getFlieList(query) {
  return request({
    url: '/dzda/file/list',
    method: 'get',
    params: query
  })
}

// 修改文件 dzda/file
export function changeFile(data) {
  return request({
    url: '/dzda/file',
    method: 'put',
    data: data
  })
}

// 上传文件 dzda/file
export function upfile(data) {
  return request({
    url: '/dzda/file',
    method: 'post',
    data: data
  })
}

export function getSignature(query) {
  return request({
    url: '/dzda/signature/list',
    method: 'get',
    params: query
  })
}

// 申请印章 dzda/sigapply
export function addSigapply(data) {
  return request({
    url: '/dzda/sigapply',
    method: 'post',
    data: data
  })
}

// 获取印章 dzda/sigapply
export function getSigapplyList(query) {
  return request({
    url: '/dzda/sigapply/list',
    method: 'get',
    params: query
  })
}

// 档案审核管理 verify/list
export function getverifyList() {
  return request({
    url: '/dzda/verify/list' + `?eventId=1688414866628444162`,
    method: 'get'
  })
}

export function seachverifyList(query) {
  return request({
    url: '/dzda/verify/list',
    method: 'get',
    params: query
  })
}

// 审核
export function changeverify(data) {
  return request({
    url: '/dzda/verify',
    method: 'put',
    data: data
  })
}

// 上传文件 common/upload
export function uploadFiles(data) {
  const formData = new FormData()
  formData.append('file', data)
  return request({
    url: '/common/upload',
    method: 'post',
    data: formData
  })
}

// 删除印章
export function delSealid(ids) {
  return request({
    url: '/dzda/sigapply/' + ids,
    method: 'delete'
  })
}

// 修改印章
export function changesigapply(data) {
  return request({
    url: '/dzda/sigapply',
    method: 'put',
    data: data
  })
}

// 修改签章用户
export function changesignature(data) {
  return request({
    url: '/dzda/signature',
    method: 'put',
    data: data
  })
}

// 获取申请列表 damanage
export function getdamanage(daIds) {
  return request({
    url: '/dzda/damanage/getByDaIds' + `?daIds=${daIds}`,
    method: 'get'
  })
}

// 审核流程addFlow
export function addFlow(data) {
  return request({
    url: '/dzda/flow',
    method: 'post',
    data: data
  })
}

export function geflowList(query) {
  return request({
    url: '/dzda/flow/list',
    method: 'get',
    params: query
  })
}

// 修改管理文件
export function changefile(data) {
  return request({
    url: '/dzda/file',
    method: 'put',
    data: data
  })
}

// 删除文件 dzda/file
export function delDile(id) {
  return request({
    url: '/dzda/file/' + id,
    method: 'delete'
  })
}

