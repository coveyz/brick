import http from '@/utils/request'

export type LoginType = {
  username: string
  password: string
}

export type UserInfoResult = {
  roles: Array<string>
  introduction: string
  avatar: string,
  name: string
}

/** 🍌 登录 */
export const login = (data: LoginType) => {
  return http({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

/** 🍌 获取用户信息 */
export const getInfo = (token?: string) => {
  return http({
    url: '/api/user/info',
    method: 'get',
    params: {
      token
    }
  })
}
