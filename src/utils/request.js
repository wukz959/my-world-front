import axios from 'axios'
import { Loading, Message } from 'element-ui'
import { baseURL } from './constants'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000
})
let loadingInstance = null
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (!config.hideLoading) {
    loadingInstance = Loading.service({ fullscreen: true, text: '我也很急，你别急...' })
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (loadingInstance) {
    loadingInstance.close()
  }
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  if (loadingInstance) {
    loadingInstance.close()
  }

  Message({
    // 服务器好像出问题了哦！！！再试试看?
    message: '好像超时了哦！！！',
    type: 'error',
    showClose: true
  })
  console.log(error)
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default instance
