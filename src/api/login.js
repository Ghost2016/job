
import fetch from '@/lib/fetch'
export function login() {
  return fetch({
    url: 'User/Login',
    data: {
      'actoken': '123123',
      'Data': { 'zsid': '123', 'user': '管理员', 'pwd': '' }
    },
    method: 'post'
  })
}

