// 使用网络请求

const baseApi = 'http://192.168.20.250:8080/api'
const request = config => {

  config.header = config.header || {}
  config.header['Authorization'] = 'Basic 123456'
  config.header['System-Id'] = '000000'
  const shorUrl = config.url

  // // post请求的时候,把参数放到地址中
  // if (config.params) {
  //   const str = Object.keys(config.params)
  //     .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(config.params[key]))
  //     .join('&')
  //
  //   config.url = config.url + '?' + str
  // }
  const httpUrl = baseApi + config.url

  return new Promise((resolve, reject) => {
    wx.p
      .request({
        url: httpUrl,
        method: config.method || 'get',
        header: config.header,
        data: config.data
      })
      .then(response => {
        // console.log("返回值",response);

        // statusCode 说明网络是通了
        let { data, statusCode } = response
        const code = data.code || 200
        const msg = data.msg || '数据异常'

        if (statusCode === 200 && code === 200) {
          resolve(data)
        } else if (code === 401) {
          wx.redirectTo({ url: '/pages/index/index' })
          resolve(data)
        } else {
          wx.showToast({ icon: 'error', title: '数据异常' })

          reject('数据异常')
        }

        // ===========================
      })
      .catch(error => {
        console.log('error', error)
        let { errMsg } = error
        if (errMsg === 'Network Error') {
          errMsg = '后端接口连接异常'
        } else if (errMsg.includes('timeout')) {
          errMsg = '系统接口请求超时'
        } else if (errMsg.includes('Request failed with status code')) {
          errMsg = '系统接口' + errMsg.substr(errMsg.length - 3) + '异常'
        }

        wx.showToast({ icon: 'error', title: errMsg })
        reject(error)
      })
  })
}

export default request
