// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
require('@/lib/common.js')
import './page.less'
import { fetchStatistics } from '@/api/statistics.js'
const timeSelector = require('@/components/timeSelector/timeSelector')
const statisticsDetail = require('@/components/statisticsDetail/statisticsDetail')
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
const type = 2
$(function() {
  statisticsDetail.render('statistics-detail', {
    type
  })
  timeSelector.render('time-selector', {
    type,
    onLookup: ({Start,End}) => {
      fetchData({Start,End,type})
    }
  })
})

function fetchData({Start,End,type}) {
  fetchStatistics({Start,End,type}).then(
    res => {
      const data = res.data.Data
      console.log(data)
      timeSelector.setPreSaveMoney(data.syje)
      statisticsDetail.render('statistics-detail', {
        type,data
      })
    }
  ).catch(
    e => {
      console.log(e)
    }
  )
}