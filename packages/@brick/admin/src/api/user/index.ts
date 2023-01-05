import http from '@/utils/request'

export type LoginType = {
  username: string
  password: string
}

/** 🍌 登录 */
export const login = (data: LoginType) => {
  return http({
    url: '/api/user/login',
    method: 'post',
    data
  })
}