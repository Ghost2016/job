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

export function getAnamnesis(obj) {
  return fetch({
    url: 'Emr/Get',
    data: {
      "actoken": getToken(),
      "Data": obj,
    },
    method: 'post'
  })
}

export function editAnamnesis(obj) {
  return fetch({
    url: 'Emr/Edit',
    data: {
      "actoken": getToken(),
      "Data": obj,
    },
    method: 'post'
  })
}

export function deleteAnamnesis(obj) {
  return fetch({
    url: 'Emr/Delete',
    data: {
      "actoken": getToken(),
      "Data": obj,
    },
    method: 'post'
  })
}
