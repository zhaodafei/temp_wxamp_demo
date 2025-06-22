import request from '@/utils/request.js'

// 获取字典
export const APIDict_getList = data => {
  return request({
    url: '/blade-system/dict/dictionary',
    method: 'get',
    data: data
  })
}
