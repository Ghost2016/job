
/**
 * 预约相关的接口
 */

import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

/**
 * 预约根据日期查找列表
 *
 */
export function fetchApointmentList({ today }) {
  // if (APP_ENV !== 'production') {
  //   today = '2017-05-19'
  // }
  return fetch({
    url: 'YY/List',
    data: {
      'actoken': getToken(),
      'Data': {
        'Today': today
      }
    },
    method: 'post'
  })
}

// 新增无号预约
export function newAppointmentWithOutNumber(obj) {
  return fetch({
    url: 'YY/AddWH',
    data: {
      'actoken': getToken(),
      'Data': obj
    },
    method: 'post'
  })
}

// 新增有号预约
export function newAppointmentWithNumber(obj) {
  return fetch({
    url: 'YY/Add',
    data: {
      'actoken': getToken(),
      'Data': obj
    },
    method: 'post'
  })
}

// 删除预约
export function deleteAppointment(number) {
  return fetch({
    url: 'YY/Delete',
    data: {
      'actoken': getToken(),
      'Data': {
        no: number
      }
    },
    method: 'post'
  })
}

// 编辑无号预约
export function editAppointmentWithOutNumber(obj) {
  return fetch({
    url: 'YY/EditWH',
    data: {
      'actoken': getToken(),
      'Data': obj
    },
    method: 'post'
  })
}

// 编辑有号预约
export function editAppointmentWithNumber(obj) {
  return fetch({
    url: 'YY/Edit',
    data: {
      'actoken': getToken(),
      'Data': obj
    },
    method: 'post'
  })
}

//获取有号预约详情
export function getAppointmentDetailWithNumber(number) {
    return fetch({
        url: 'YY/Get',
        data: {
            'actoken': getToken(),
            'Data': {
              no: number
            }
        },
        method: 'post'
    })
}

//获取无号预约详情
export function getAppointmentDetailWithoutNumber(number) {
    return fetch({
        url: 'YY/GetWH',
        data: {
            'actoken': getToken(),
            'Data': {
                no: number
            }
        },
        method: 'post'
    })
}
