import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

/**
 * 新增病历
 *
 */

export function addAnamnesis(obj) {
  return fetch({
    url: 'Emr/Add',
    data: {
      "actoken": getToken(),
      "Data": obj,
    },
    method: 'post'
  })
}