if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'

$(function() {
  const Appointments = require('@/components/appointments/appointments.js')
  Appointments.render('appointment-record', {})
})
