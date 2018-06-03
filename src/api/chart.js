/**
 * Created by Vincent on 2018/6/3.
 */
import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

export function fetchPatientStatistics({ today }) {
  return fetch({
    url: 'Month/HZ',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      'Data': {
        'Today': today
      }
    },
    method: 'post'
  })
}

export function fetchChargeStatistics({ today }) {
  return fetch({
    url: 'Month/SF',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      'Data': {
        'Today': today
      }
    },
    method: 'post'
  })
}

export function fetchReturnStatistics({ today }) {
  return fetch({
    url: 'Month/FF',
    data: {
      'actoken': 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G',
      'Data': {
        'Today': today
      }
    },
    method: 'post'
  })
}
