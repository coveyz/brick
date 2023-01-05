import { MockMethod } from 'vite-plugin-mock'

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
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      // console.log('body=>', body)
      const { username } = body
      const token = username === 'admin' ? tokens['admin'] : tokens['editor'];

      if (!token) {
        return {
          code: 60204,
          message: '帐户和密码不正确',
          data: null
        }
      }

      return {
        code: 20000,
        message: '',
        data: token
      }
    }
  }
] as MockMethod[]