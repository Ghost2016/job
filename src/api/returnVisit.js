
/**
 * 回访相关的接口
 */

import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

/**
 * 预约根据日期查找回访列表
 *
 */
export function fetchReturnVisitList({ today }) {
  if (APP_ENV !== 'production') {
    today = '2017-05-19'
  }
  return fetch({
    url: 'FF/List',
    data: {
      'actoken': getToken(),
      'Data': {
        'Today': today
      }
    },
    method: 'post'
  })
}
