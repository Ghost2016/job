
import fetch from '@/lib/fetch'
import { getToken } from '@/lib/utils'

/**
 * 收入统计
 * type:
 * 1 收入统计
 * 2 预存款统计
 * 3 工作量统计
 * 4 接诊统计
 * 5 回访统计
 * 6 外加工统计
 */
export function fetchStatistics({Start,End,type}) {
  let url = ''
  switch (type) {
    case 1:
      url = 'Rpt/SF'
      break;
    case 2:
      url = 'Rpt/YC'
      break;
    case 3:
      url = 'Rpt/GZL'
      break;
    case 4:
      url = 'Rpt/JZ'
      break;
    case 5:
      url = 'Rpt/HF'
      break;
    case 6:
      url = 'Rpt/WJG'
      break;
    default:
      break;
  }
  return fetch({
    url: url,
    data: {
      'actoken': getToken(),
      'Data': {
        Start,End
      }
    },
    method: 'post'
  })
}
