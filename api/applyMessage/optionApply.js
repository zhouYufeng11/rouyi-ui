import request from 'utils/request'
import { tpl } from './tpl';

//  将组合完成的数据返回给后端
export function setApply(data) {
  console.log(data);
  return
}

/**
 * 1687387430054805506    食品生产许可
 * 1688400871078113282    房地产开发企业
 * 1688401017690009602
 * 1688401266206715906 
 * 1688401377984917505
 * 1688401473719906306 
 * 1688401673075175425
 * 1688401782642978818 
 */

console.log(tpl);

export function uploadTemplate() {  
  return request({
    url: '/dzda/template',
    method: 'post',
    data: {
      "deptId": "101",
      "deptName": "政策法规处",
      "itemNo": "1688401782642978818",
      "template": tpl,
      "templateDesc": "商品房预售许可100",
      "templateName": "商品房预售许可100"
    }
  })
}

export function getTemplateList(query) {  
  return request({
    url: '/dzda/template/list',
    method: 'get',
    params: query
  })
}

//  快速生成
export function generate(data) {
  return request({
    url: '/dzda/template/generate',
    method: 'post',
    data
  });
}

//  获取事项
export function getGenInfo(query) {
  console.log(query);
  return request({
    url: '/dzda/template/getGenInfo?daId=' + query.daId,
    method: 'get'
  })
}

