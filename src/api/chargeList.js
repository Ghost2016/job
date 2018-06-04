/**
 * Created by Vincent on 2018/6/2.
 */
/* 收费列表接口*/

import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

export function fetchChargeList({ blh }) {
  return fetch({
    url: 'HZ/SFList',
    data: {
      'actoken': getToken(),
      'Data': {
        'blh': blh
      }
    },
    method: 'post'
  })
}
