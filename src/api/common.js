
import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

// 患者来源
export function fetchPatientSrc() {
  return _fetchCommonNames('患者来源')
}
/**
 * 通用码表
 * type 码表类型，值范围：患者来源、回访内容、预约内容
 */
function _fetchCommonNames(type) {
  return fetch({
    url: 'Comm/Name',
    data: {
      'actoken': getToken(),
      'Data': {
        'type': type
      }
    },
    method: 'post'
  })
}

/**
 * 通用码表
 * type 码表类型，值范围：患者来源、回访内容、预约内容
 */
export function fetchDoctorList() {
  return fetch({
    url: 'Comm/YS',
    data: {
      'actoken': getToken(),
      Data: null
    },
    method: 'post'
  })
}

/**
 * 获取患者列表
 */
export function fetchPatientList(key) {
  return fetch({
    url: 'Comm/HZ',
    data: {
      'actoken': getToken(),
      Data: {
        key: key || 12
      }
    },
    method: 'post'
  })
}
