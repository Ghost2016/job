/**
 * Created by Vincent on 2018/6/3.
 */
import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

export function fetchHistoryPerformance({ today }) {
  return fetch({
    url: 'Month/Fee',
    data: {
      'actoken': getToken(),
      'Data': {
        'Today': today
      }
    },
    method: 'post'
  })
}
