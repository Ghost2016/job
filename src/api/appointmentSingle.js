/**
 * Created by Vincent on 2018/6/3.
 */
import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

export function fetchAppointmentSingle({ blh }) {
  return fetch({
    url: 'HZ/YYList',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      'Data': {
        'blh': blh
      }
    },
    method: 'post'
  })
}
