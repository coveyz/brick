import { defineStore } from 'pinia';
import { UserType } from './types';
import axios from 'axios'

export const useUserStore = defineStore('admin-user', {
  state: (): UserType => ({
    token: '',
  }),
  actions: {
    /** 🍌登录 */
    login(userInfo: any) {
      return new Promise((resolve, reject) => {
        const { username, password } = userInfo
        console.log('userInfo=>', userInfo)
        axios.get('/api/getUsers').then((res) => {
          console.log(res);
        })
      })
    }
  }
})