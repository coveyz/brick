import axios, { AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/modules/user'
import { getToken } from '@/utils/auth'
import { errorMsg } from '@/utils/tools'


const service = axios.create({
  timeout: 5000
})

/** 🍌 请求拦截 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = useUserStore().token;
    if (token) {
      (config.headers as any)['X-Token'] = 'Bearer ' + getToken()
    }
    return config
  },
  (error) => {
    console.error(error);
    return Promise.reject(error)
  }
)

/** 🍌 响应拦截 */
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // console.log('service-response->', res)
    if (res.code !== 20000) {
      errorMsg(res.msg || 'Error');
      //todo🍌 50008:非法令牌；50012:其他客户端已登录；50014:令牌已过期；
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.error('response-error=>', error)
    errorMsg(error.message)
    return Promise.reject(error)
  }
)


export default service;