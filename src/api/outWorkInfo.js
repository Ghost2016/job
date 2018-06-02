/**
 * Created by Vincent on 2018/6/2.
 */
/* 外加工信息接口*/

import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

export function fetchOutWorkList({ blh }) {
  return fetch({
    url: 'HZ/WJGList',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      'Data': {
        'blh': blh
      }
    },
    method: 'post'
  })
}
