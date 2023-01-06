import axios, { AxiosRequestConfig } from 'axios'
import { ElMessageBox } from 'element-plus'
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
      errorMsg(res.message || 'ResponseError');
      //🍌 50008:非法令牌；50012:其他客户端已登录；50014:令牌已过期；
      const limit = [50008, 50012, 50014];

      if (limit.includes(res.code)) {
        ElMessageBox.confirm('您已注销，您可以取消以保留此页面，或再次登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          useUserStore().resetToken().then(() => {
            location.reload()
          })
        })
      }

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