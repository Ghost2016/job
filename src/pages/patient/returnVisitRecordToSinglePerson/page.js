if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchReturnVisitSingle } from '@/api/returnVisitSingle'
const Appointments = require('@/components/appointments/appointments.js')

let returnVisitSingleData = {}

$(function() {
  getReturnVisitSingle({ blh: '32045124' })
})

function getReturnVisitSingle(blh) {
  fetchReturnVisitSingle(blh).then(
        res => {
          returnVisitSingleData = res
          if ('Data' in returnVisitSingleData.data) {
            Appointments.render('return-visit-record', returnVisitSingleData.data.Data, true)
          }
        }
    ).catch(
        e => {
          console.log(e)
        }
    )
}
