
import fetch from '@/lib/fetch'

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
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
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
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      Data: null
    },
    method: 'post'
  })
}
