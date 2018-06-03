if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
const Appointments = require('@/components/appointments/appointments.js')
import { fetchAppointmentSingle } from '@/api/appointmentSingle'

let appointmentSingleData = {}

$(function() {
  getAppointmentSingle({ blh: '32045124' })
})

function getAppointmentSingle(blh) {
  fetchAppointmentSingle(blh).then(
      res => {
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
