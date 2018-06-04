if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchReturnVisitSingle } from '@/api/returnVisitSingle'
import { getSearchParam } from '@/lib/utils'
const Appointments = require('@/components/appointments/appointments.js')
const Native = require('@/lib/native.js')

let returnVisitSingleData = {}
let blh = getSearchParam('blh')||'32045124'

$(function() {
  getReturnVisitSingle({ blh:  blh})
})

function getReturnVisitSingle(blh) {
    loading()
  fetchReturnVisitSingle(blh).then(
        res => {
            loadingdone()
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

function funRightTouch() {
    Native.startNextActivity(
        {
            nexturl: HTML_BASE_URL_PREFIX + 'myWork/newReturnVisit/page.html',
            nextparam: '',
            title: '新增回访',
            flag:1,
        }
    )
}
