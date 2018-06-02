// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
import './page.less'
require('@/lib/common.js')
import { fetchReturnVisitList } from '@/api/returnVisit'
const Appointments = require('@/components/appointments/appointments.js')
import { Timer } from '@/lib/utils.js'

$(function() {
  var timer = new Timer({
    LeftArrowId: 'left-arrow',
    RightArrowId: 'right-arrow',
    TextId: 'timer-text',
    regFormat: 'YYYY年MM月DD日应回访',
    onAdd: function(date) {
      fetchData(date)
    },
    onMinus: function(date) {
      fetchData(date)
    }
  })
  fetchData(timer.getParsedTime())
})

// 获取数据
function fetchData(date) {
  fetchReturnVisitList({ today: date }).then(
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
