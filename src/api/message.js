import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

/**
 * 消息-常用分类最大为6个
 *
 */

export function getCommonMsg() {
  return fetch({
    url: 'Comm/MsgUse',
    data: {
      "actoken": getToken(),
      "Data": null,
    },
    method: 'post'
  })
}

export function getMsgById(messupid) {
  return fetch({
    url: 'Comm/Msg',
    data: {
      "actoken": getToken(),
      "Data": {
        "messupid":messupid || 2
      },
    },
    method: 'post'
  })
}

export function getMsgKind(messupid) {
  return fetch({
    url: 'Comm/MsgKind',
    data: {
      "actoken": getToken(),
      "Data": {
        "messupid":messupid || 2
      },
    },
    method: 'post'
  })
}