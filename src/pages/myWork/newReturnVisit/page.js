// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
import './page.less'
require('@/lib/common.js')

$(function() {
  // todo
  const patientInfos = require('@/components/patientInfos/patientInfos.js')
  patientInfos.render('patient-info', {
    a: 1
    // todo
  })
  var opt = {}
  opt.date = { preset: 'date' }
  opt.datetime = { preset: 'datetime' }
  opt.time = { preset: 'time' }
  opt.default = {
    // theme: 'ios', // 皮肤样式
    display: 'bottom', // 显示方式
    mode: 'scroller', // 日期选择模式
    dateFormat: 'yyyy-mm-dd',
    lang: 'zh'
    // showNow: true,
    // nowText: '今天',
    // startYear: currYear - 10, // 开始年份
    // endYear: currYear + 10 // 结束年份
  }
  var optDateTime = $.extend(opt['datetime'], opt['default'])
  window.mobiscroll.datetime('#current-return-visit-time', optDateTime)
})
