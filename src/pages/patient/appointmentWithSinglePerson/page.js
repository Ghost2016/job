if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
const Appointments = require('@/components/appointments/appointments.js')
import { fetchAppointmentSingle } from '@/api/appointmentSingle'
import { getSearchParam } from '@/lib/utils'
const Native = require('@/lib/native.js')
const GDialog = require('@/components/gDialog/gDialog.js')

let appointmentSingleData = {}
let blh = getSearchParam('blh')||'32045124'
// alert(blh)
$(function() {
    // GDialog.render('gDialog', {
    //     titleText: '选择预约方式',
    //     hasCancel: true,
    //     onEnsureClick: () => {
    //         GDialog.dismiss()
    //         Native.startNextActivity(
    //             {
    //                 nexturl: HTML_BASE_URL_PREFIX + 'myWork/newAppointment/page.html?type=whyy',
    //                 nextparam: '',
    //                 title: '新增无号预约',
    //                 flag:1,
    //             }
    //         )
    //     },
    //     onCancelClick: () => {
    //         GDialog.dismiss()
    //         Native.startNextActivity(
    //             {
    //                 nexturl: HTML_BASE_URL_PREFIX + 'myWork/newAppointment/page.html?type=yhyy',
    //                 nextparam: '',
    //                 title: '新增有号预约',
    //                 flag:1,
    //             }
    //         )
    //     }
    // })
    $('#appointment-record').on('click', '.appointment-item', function () {
        var that = this
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'myWork/newAppointment/page.html?type=yhyy&isEdit=1&no=' + that.dataset.no,
                nextparam: '',
                title: '编辑有号预约',
                flag: 8,
            }
        )

    })
    $('#appointment-record').on('click','.appointment-item-right-tel',function (e) {
        e.stopPropagation()
        window.js.invokeCall(e.target.dataset.tel)
    })
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

window.funRightTouch =  function () {
    // GDialog.show()
    Native.startNextActivity(
       {
           nexturl: HTML_BASE_URL_PREFIX + 'myWork/newAppointment/page.html?type=yhyy',
           nextparam: '',
           title: '新增有号预约',
           flag:1,
       }
     )
}
