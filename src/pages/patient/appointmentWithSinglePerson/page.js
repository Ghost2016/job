if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
const Appointments = require('@/components/appointments/appointments.js')
import { fetchAppointmentSingle } from '@/api/appointmentSingle'
import { getSearchParam } from '@/lib/utils'
const Native = require('@/lib/native.js')

let appointmentSingleData = {}
let blh = getSearchParam('blh')||'32045124'

$(function() {
  getAppointmentSingle({ blh:blh })
})

function getAppointmentSingle(blh) {
    loading()
  fetchAppointmentSingle(blh).then(
      res => {
          loadingdone()
        appointmentSingleData = res
        if ('Data' in appointmentSingleData.data) {
          Appointments.render('appointment-record', appointmentSingleData.data.Data, true)
        }
      }
  ).catch(
      e => {
        console.log(e)
      }
  )
}

function funRightTouch() {
    // Native.startNextActivity(
    //     {
    //         nexturl: HTML_BASE_URL_PREFIX + 'myWork/newReturnVisit/page.html',
    //         nextparam: '',
    //         title: '新增回访',
    //         flag:1,
    //     }
    // )
    alert(1)
}
