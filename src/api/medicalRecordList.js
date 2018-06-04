/**
 * Created by Vincent on 2018/6/2.
 */
/* 获取病历列表接口*/

import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

export function fetchAnamnesisList({ blh }) {
  return fetch({
    url: 'Emr/List',
    data: {
      'actoken': getToken(),
      'Data': {
        'blh': blh
      }
    },
    method: 'post'
  })
}
