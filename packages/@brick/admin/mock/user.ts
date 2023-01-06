import { MockMethod } from 'vite-plugin-mock'
import Base from '../plugins/base'

const Info = new Base();


const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // 🍌 登录
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      // console.log('body=>', body)
      const { username } = body
      const token = username === 'admin' ? tokens['admin'] : tokens['editor'];

      if (!token) {
        return Info.error(60204, '帐户和密码不正确')
      }
      return Info.success(token)
    }
  },
  // 🍌 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: ({ query }) => {
      const { token } = query;
      const info = users[token];

      if (!info) {
        return Info.error(50008, '')
      }
      return Info.success(info)
    }
  }
] as MockMethod[]