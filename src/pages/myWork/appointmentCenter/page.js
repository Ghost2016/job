// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
import './page.less'
require('@/lib/common.js')
// const native = require('@/static/js/native.js')
// $('#app').html('通过jquery')
// window.location.href = '../../index/index/page.html'
// native.startNextActivity(
//   {
//     nexturl: '../../index/index/page.html',
//     title: 'bbc',
//     flag: 3
//   }
// )
const GDialog = require('@/components/gDialog/gDialog.js')
GDialog.render('gDialog', {
  titleText: '选择预约方式',
  hasCancel: true,
  onEnsureClick: () => {
    GDialog.dismiss()
    console.log('无号预约')
  },
  onCancelClick: () => {
    GDialog.dismiss()
    console.log(' 有号预约')
  }
})
const Appointments = require('@/components/appointments/appointments.js')
Appointments.render('appointments', {
  // titleText: '选择预约方式',
  // hasCancel: true,
  // onEnsureClick: () => {
  //   GDialog.dismiss()
  //   console.log('无号预约')
  // },
  // onCancelClick: () => {
  //   GDialog.dismiss()
  //   console.log(' 有号预约')
  // }
})

$(function() {
  // todo
  $('#save').on('click', (e) => {
    GDialog.show()
  })
})
