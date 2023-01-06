import { defineStore } from 'pinia';
import { getToken, setToken, removeToken } from '@/utils/auth'
import { errorMsg } from '@/utils/tools'
import { UserType } from './types';
import { login, getInfo, UserInfoResult } from '@/api/user'


export const useUserStore = defineStore('admin-user', {
  state: (): UserType => ({
    token: getToken(),
    roles: [],
    name: '',
    avatar: '',
    introduction: ''
  }),
  getters: {
    userRoles: (state) => {
      return state.roles
    }
  },
  actions: {
    SET_TOKEN(token: string) {
      this.token = token
    },
    SET_ROLES(roles: Array<string>) {
      this.roles = roles
    },
    SET_NAME(name: string) {
      this.name = name
    },
    SET_AVATAR(avatar: string) {
      this.avatar = avatar
    },
    SET_INTRODUCTION(introduction: string) {
      this.introduction = introduction
    },
    /** 🍌 登录 */
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
    },
    /** 🍌 用户信息 */
    getInfo() {
      return new Promise<UserInfoResult>(async (resolve, reject) => {
        try {
          const res = await getInfo(this.token)
          const { data } = res;

          if (!data) {
            errorMsg('验证失败，请重新登录。')
            reject('验证失败，请重新登录。')
          }

          const { roles, name, avatar, introduction } = data;
          // 🍌 权限空 判断
          if (!roles || !roles.length) {
            errorMsg('当前凭证无任何权限,请联系管理员配置权限')
            reject('当前凭证无任何权限,请联系管理员配置权限')
          }

          this.SET_ROLES(roles);
          this.SET_NAME(name);
          this.SET_AVATAR(avatar);
          this.SET_INTRODUCTION(introduction);

          resolve(data)
        } catch (error) {
          errorMsg("验证失败，请重新登录")
          reject("验证失败，请重新登录")
        }
      })
    },
    /** 🍌 移除token */
    resetToken() {
      return new Promise((resolve, reject) => {
        this.SET_ROLES([])
        this.SET_TOKEN('')
        removeToken();
      })
    }
  }
})