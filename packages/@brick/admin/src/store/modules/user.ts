import { defineStore } from 'pinia';
import { getToken, setToken } from '@/utils/auth'
import { UserType } from './types';
import { login } from '@/api/user'


export const useUserStore = defineStore('admin-user', {
  state: (): UserType => ({
    token: getToken(),
  }),
  actions: {
    SET_TOKEN(token: string) {
      this.token = token
    },
    /** 🍌登录 */
    login(userInfo: any) {
      return new Promise((resolve, reject) => {
        let { username, password } = userInfo
        login({ username: username.trim(), password: password })
          .then(res => {
            const { data } = res;
            this.SET_TOKEN(data.token)
            setToken(data.token)
            resolve(true)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
})