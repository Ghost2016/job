/**
 * Created by Vincent on 2018/6/3.
 */
import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

export function fetchReturnVisitSingle({ blh }) {
  return fetch({
    url: 'HZ/FFList',
    data: {
      'actoken': getToken(),
      'Data': {
        'blh': blh
      }
    },
    method: 'post'
  })
}
