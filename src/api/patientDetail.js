/**
 * Created by Vincent on 2018/6/2.
 */
/* 患者详情接口*/

import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

export function fetchPatientDetail({ blh }) {
  return fetch({
    url: 'HZ/Get',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      'Data': {
        'blh': blh
      }
    },
    method: 'post'
  })
}
