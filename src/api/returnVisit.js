
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
  // if (APP_ENV !== 'production') {
  //   today = '2017-05-19'
  // }
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

/**
 * 新增回访
 *
 */
export function addReturnVisit({ blh, date, content, docid, state, result }) {
  return fetch({
    url: 'FF/Add',
    data: {
      'actoken': getToken(),
      'Data': {
        'blh': blh || 1,
        'date': date || '2018-01-01',
        'content': content || '测试回访',
        'docid': docid || '1',
        'state': state || '已回访',
        'result': result || '测试结果'
      }
    },
    method: 'post'
  })
}

/**
 * 修改回访
 *
 */
export function editReturnVisit({ sid, blh, date, content, docid, state, result }) {
  return fetch({
    url: 'FF/Edit',
    data: {
      'actoken': getToken(),
      'Data': {
        'sid': sid || '13266',
        'blh': blh || 1,
        'date': date || '2018-01-01',
        'content': content || '测试回访',
        'docid': docid || '1',
        'state': state || '已回访',
        'result': result || '测试结果'
      }
    },
    method: 'post'
  })
}

/**
 * 修改回访
 *
 */
export function deleteReturnVisit(sid) {
  return fetch({
    url: 'FF/Delete',
    data: {
      'actoken': getToken(),
      'Data': {
        'sid': sid || '13266'
      }
    },
    method: 'post'
  })
}
