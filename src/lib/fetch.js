import axios from 'axios'

// import Cookies from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: (APP_ENV !== 'production') ? '/v1' : 'http://app.kq123.com/QSYYAPI/api/', //eslint-disable-line
  // 所有的接口都添加上前缀以统一请求
  // baseURL: '/v1',  // api的base_url
  // 请求超时时间
  timeout: 15000,
  // 是否携带cookie
  withCredentials: true
})

/**
 * request拦截器
 * 构建request请求之前往header中添加token
 */
service.interceptors.request.use(config => {
  if (APP_ENV !== 'production') { //eslint-disable-line
    // const mockedCookie = require('./cookie.config.js')
  }
  // if (!Cookies.get('mgsid')) {
  //   location.href = '/h5/html/regist.html?toPageUrl=/h5v2/index.html'
  // }
  // 如果是开发环境才会添加
  // 不是正式环境都会添加
  if (APP_ENV !== 'production') {  //eslint-disable-line
    // 忽略CSRF
    // config.url += ((config.url.indexOf('?') > -1) ? '&' : '?') + 'ignoreCsrfToken=true'
  }
  // 修改Content-Type，后台接受类型
  // config.headers['Content-Type'] = 'application/json'
  return config
}, error => {
  // 构建请求出错
  console.log(error) // for debug
  Promise.reject(error)
})

/**
 * respone拦截器
 * 对非200范围内状态码拦截
 */
service.interceptors.response.use(
  response => {
    // 如果有错误信息
    if (response.data.Msg) {
      // window.$alert(response.data.Msg)
        Native.showToast(response.data.Msg)
      return
    }
    return response
  },
  error => {
    console.log('err: ' + error)// for debug
    const ErrorMsg = error.message
    if (ErrorMsg.indexOf('timeout') > -1) {
      console.log('网络请求超时，请检查网路')
      return Promise.reject(error)
    }
    const statusCode = error.response.status  // http状态码
    if (statusCode >= 500) {
    // 500状态码
    } else if (statusCode === 401) {
    // 401 状态码
    } else {
    // 其他不在200内的状态码
    }
    return Promise.reject(error)
  }
)

// 方便使用mockjs来进行捕获进行本地调试
// const request = (APP_ENV !== 'production') ? axios : service //eslint-disable-line

const request = service
export default request

