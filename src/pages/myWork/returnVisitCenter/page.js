// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
import './page.less'
require('@/lib/common.js')
import { fetchReturnVisitList } from '@/api/returnVisit'
const Appointments = require('@/components/appointments/appointments.js')
import { Timer } from '@/lib/utils.js'
var timer = new Timer()
$(function() {
  updateDate()
  fetchData()
  $('.left-arrow').on('click', () => {
    timer.minusOneDay()
    updateDate()
    fetchData()
  })
  $('.right-arrow').on('click', () => {
    timer.addOneDay()
    updateDate()
    fetchData()
  })
})
// 更新date内值
function updateDate() {
  $('.appointment-time>span').html(timer.getParsedTime())
}
// 获取数据
function fetchData() {
  fetchReturnVisitList({ today: timer.getParsedTime() }).then(
    res => {
      const data = res.data.Data
      console.log(data)
      updateReturnVisit(data)
    }
  ).catch(
    e => {
      console.log(e)
    }
  )
}
// 更新回访条目
function updateReturnVisit(data) {
  Appointments.render('appointments', data)
}
