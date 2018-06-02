// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
require('@/lib/common.js')
const Native = require('@/lib/native.js')
import './page.less'

const items = ['就诊人数趋势图', '工作量趋势图', '回访次数趋势图']
const today = new Date()

$(function() {
  $('#date').text(today.getFullYear() + '/' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))))

  $('.float-date-left').on('click', function() {
    if (today.getMonth() === 1) {
      today.setFullYear(today.getFullYear() - 1)
      today.setMonth(12)
    } else {
      today.setMonth(today.getMonth() - 1)
    }
    $('#date').text(today.getFullYear() + '/' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))))
  })

  $('.float-date-right').on('click', function() {
    if (today.getMonth() === 12) {
      today.setFullYear(today.getFullYear() + 1)
      today.setMonth(1)
    } else {
      today.setMonth(today.getMonth() + 1)
    }
    $('#date').text(today.getFullYear() + '/' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))))
  })

  // todo
  $('.history-detail-brief>div>span:nth-child(3)').on('click', function(e) {
    const index = $(this).parent().index()
    Native.startNextActivity({
      nexturl: HTML_BASE_URL_PREFIX + 'chartCenter/chart/page.html', // eslint-disable-line
      nextparam: '',
      title: items[index],
      flag: 1
    })
  })
})
