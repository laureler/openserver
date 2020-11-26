import request from '@/utils/request'

export function login(username, password) {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        token: 'tokentokentoken'
      }
    })
  })
  /* return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })*/
}

export function getInfo(token) {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        name: 'admin',
        avatar: 'avatar',
        roles: ['admin']
      }
    })
  })
  /* return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })*/
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
