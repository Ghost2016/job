import fetch from '@/lib/fetch'
export function test() {
  return fetch.get('/users/123')
}
/**
 * 每日患者列表
 *
 */

export function fetchPatientList({ today }) {
  return fetch({
    url: 'HZ/List',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      'Data': {
        'Today': today,
        'lx': 'all'
      }
    },
    method: 'post'
  })
}

/**
 * 通讯录
 *
 */

export function fetchContacts() {
  return fetch({
    url: 'Comm/WH',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G'
    },
    method: 'post'
  })
}

/**
 * 新增患者
 *
 */

export function newPatient({ name, phone, tel, sex, birth, docid, docname, hzsource, address }) {
  return fetch({
    url: 'HZ/Add',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      'Data': {
        'name': name || '测试',
        'phone': phone || '13811223388',
        'tel': tel || '',
        'sex': sex || '男',
        'birth': birth || '2000-01-01',
        'docid': docid || 2,
        'docname': docname || '',
        'hzsource': hzsource || '附近居民',
        'address': address || '万科海悦东'
      }
    },
    method: 'post'
  })
}

/**
 * 获取患者详情
 *
 */

export function fetchPatientDetailByBlh(blh) {
  return fetch({
    url: 'HZ/Get',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      'Data': {
        'blh': blh || '1703076588'
      }
    },
    method: 'post'
  })
}

/**
 * 删除患者
 *
 */

export function deletePatientByBlh(blh) {
  return fetch({
    url: 'HZ/Delete',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      'Data': {
        'blh': blh || 0
      }
    },
    method: 'post'
  })
}

/**
 * 编辑患者
 *
 */

export function editPatient({ name, phone, tel, sex, birth, docid, docname, hzsource, address, blh }) {
  return fetch({
    url: 'HZ/Edit',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      'Data': {
        'blh': blh || 0,
        'name': name || '测试',
        'phone': phone || '13811223388',
        'tel': tel || '',
        'sex': sex || '男',
        'birth': birth || '2000-01-01',
        'docid': docid || 2,
        'docname': docname || '',
        'hzsource': hzsource || '附近居民',
        'address': address || '万科海悦东'
      }
    },
    method: 'post'
  })
}

