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
import { fetchApointmentList } from '@/api/appointment'
const GDialog = require('@/components/gDialog/gDialog.js')
const Appointments = require('@/components/appointments/appointments.js')
import { Timer } from '@/lib/utils.js'
const Native = require('@/lib/native.js')



$(function() {
    GDialog.render('gDialog', {
        titleText: '选择预约方式',
        hasCancel: true,
        onEnsureClick: () => {
            GDialog.dismiss()
            Native.startNextActivity(
                {
                    nexturl: HTML_BASE_URL_PREFIX + 'myWork/newAppointment/page.html?type=whyy',
                    nextparam: '',
                    title: '新增无号预约',
                    flag:1,
                }
            )
        },
        onCancelClick: () => {
            GDialog.dismiss()
            Native.startNextActivity(
                {
                    nexturl: HTML_BASE_URL_PREFIX + 'myWork/newAppointment/page.html?type=yhyy',
                    nextparam: '',
                    title: '新增有号预约',
                    flag:1,
                }
            )
        }
    })

  var timer = new Timer({
    LeftArrowId: 'left-arrow',
    RightArrowId: 'right-arrow',
    TextId: 'timer-text',
    regFormat: 'YYYY年MM月DD日的预约',
    onAdd: function(date) {
      fetchData(date)
    },
    onMinus: function(date) {
      fetchData(date)
    }
  })
  fetchData(timer.getParsedTime())
  // todo
  $('#save').on('click', (e) => {
    GDialog.show()
  })
    
    $('#appointments').on('click','.appointment-item',function () {
        var that = this
        if(that.dataset.yylx === '有号预约'){
            Native.startNextActivity(
                {
                    nexturl: HTML_BASE_URL_PREFIX + 'myWork/newAppointment/page.html?type=yhyy&isEdit=1&no=' + that.dataset.no,
                    nextparam: '',
                    title: '编辑有号预约',
                    flag:8,
                }
            )
        }else if(that.dataset.yylx === '无号预约'){
            Native.startNextActivity(
                {
                    nexturl: HTML_BASE_URL_PREFIX + 'myWork/newAppointment/page.html?isEdit=1&no=' + that.dataset.no,
                    nextparam: '',
                    title: '编辑无号预约',
                    flag:8,
                }
            )
        }

    })
    $('#appointments').on('click','.appointment-item-right-tel',function (e) {
        e.stopPropagation()
        window.js.invokeCall(e.target.dataset.tel)
    })
})
// 获取数据
function fetchData(date) {
  loading()
  fetchApointmentList({ today: date }).then(
    res => {
      loadingdone()
      const data = res.data.Data
      updateAppointments(data)
    }
  ).catch(
    e => {
      loadingdone()
      console.log(e)
    }
  )
}
// 更新预约条目
function updateAppointments(data) {
  Appointments.render('appointments',data, {
    onItemClick: (selectedItem) => {
      console.log(selectedItem)
      Native.saveLocalParam('selectedAppointmentItem', selectedItem)
      console.log(Native.getLocalParam('selectedAppointmentItem'))
      return
      Native.startNextActivity(
        {
          nexturl: HTML_BASE_URL_PREFIX + `myWork/newAppointment/page.html?no=${selectedItem.no}&isEdit=true&type=${selectedItem.yylx === '有号预约' ? 'yhyy': 'whyy'}`,
          title: `编辑${selectedItem.yylx}`,
        }
      )
    }
  })
}

window.funRightTouch =  function () {
    GDialog.show()
}

