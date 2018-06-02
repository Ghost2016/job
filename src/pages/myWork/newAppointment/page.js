// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  // require('./page.html')
}
import './page.less'
require('@/lib/common.js')
import { newAppointmentWithOutNumber, newAppointmentWithNumber,
  deleteAppointment, editAppointmentWithOutNumber, editAppointmentWithNumber
} from '@/api/appointment'
$(function() {
  // window.mobiscroll.date('#appointment-time', {})
  // var currYear = (new Date()).getFullYear()
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
  window.mobiscroll.datetime('#appointment-time', optDateTime)
  // 就诊时长
  window.mobiscroll.time('#duration', {
    // theme: 'ios',
    display: 'bottom',
    timeFormat: `i'min'`
    // timeWheels: `|ii|`
  })
  $('#save').on('click', () => {
    // alert($('#patient-name').val())
    const pn = $('#patient-name').val()
    const ppn = $('#patient-phone-number').val()
    const pt = $('#appointment-time').val()
    const dur = $('#duration').val()
    const ct = $('#content-text').val()
    const dn = $('#doctor-name').val()

    if (_validate()) {
      $('#form').submit()
    }
  })
})
function _validate() {
  return true
}
