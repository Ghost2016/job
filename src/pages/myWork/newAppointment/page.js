// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  // require('./page.html')
}
import './page.less'
require('@/lib/common.js')
import { newAppointmentWithOutNumber, newAppointmentWithNumber,
  deleteAppointment, editAppointmentWithOutNumber, editAppointmentWithNumber,getAppointmentDetailWithNumber,getAppointmentDetailWithoutNumber
} from '@/api/appointment'
import { fetchPatientList, fetchDoctorList } from '@/api/common'
import { getSearchParam } from '@/lib/utils'
const GDialog = require('@/components/gDialog/gDialog.js')

// 新增 编辑
const isAdd = !getSearchParam('isEdit')
// 有号 无号 => 相对于病历号而言的
const WithNumer = getSearchParam('type') === 'yhyy'
// 删除或者编辑时会用到的预约号
var no = parseInt(getSearchParam('no')) || -1
// 弹出框
var patientSelector = null
var doctorListSelector = null
$(function() {
    GDialog.render('gDialog', {
        titleText: '确定要删除数据吗',
        hasCancel: true,
        ensureText: '确定',
        cancelText: '取消',
        onEnsureClick: () => {
            GDialog.dismiss()
            handleDelete(no)
        },
        onCancelClick: () => {
            GDialog.dismiss()

        }
    })
  // loading()
  // window.mobiscroll.date('#appointment-time', {})
  // var currYear = (new Date()).getFullYear()
  // 如果是有号
  if (WithNumer) {
      $('#patient-phone-number-p').css('display','none')
    $('#patient-name-p').append(
      `<a id="patient-name"></a><span class="arraw-into"></span>`
    )
    // $('#patient-phone-number-p').append(
    //   `<input id="patient-phone-number" readonly placeholder=""></input>`
      // `<input id="patient-phone-number" placeholder=""></input>`
    // )
  } else {
    $('#patient-name-p').append(
      `<input id="patient-name"></input>`
    )
    $('#patient-phone-number-p').append(
      `<input id="patient-phone-number" placeholder=""></input>`
    )
  }
  if (!isAdd) {
    fetchAppointmentDetail()
  }
  // 只有有号才会触发
  if(WithNumer) {
    // 病人
    $('#patient-name-p').on('click', () => {
      if (patientSelector) {
        patientSelector.show()
      } else {
        fetchPatients()
      }
    })
  }
  // 医生
  $('#doctor-name-p').on('click', () => {
    if (doctorListSelector) {
      doctorListSelector.show()
    } else {
      fetchDoctorSrcList()
    }
  })

  $('#content-text-p').on('click', () => {
    Native.startNextActivity(
      {
        nexturl: HTML_BASE_URL_PREFIX + `myWork/appointmentContent/page.html?isAppointment=true`,
        title: `选择内容`,
        flag: 5
      }
    )
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
  window.mobiscroll.datetime('#appointment-time', optDateTime)
  // 就诊时长
  window.mobiscroll.time('#duration', {
    // theme: 'ios',
    display: 'bottom',
    timeFormat: `i'min'`,
    steps: {
      // minute:15
    },
    defaultValue: new Date(1970, 1, 1, 1, 30, 0)
  })
  $('#save').on('click', () => {
    // alert($('#patient-name').val())
    const form = {
      // 没有这一条件
      // blh : $('#patient-name').val(),
      // 没有这一条件
      // ppn : $('#patient-phone-number').val(),
      date : $('#appointment-time').val(),
      len : parseInt($('#duration').val()) || 0,
      content : $('#content-text').val(),
      docid : $('#doctor-name').val()
    }
    console.log(form)
    // return
    if (!_validate()) {
      return
    }
    // 如果是有号
    if(WithNumer) {
      form.blh = $('#patient-name').val()
      // 如果是新增
      if(isAdd) {
        loading()
        newAppointmentWithNumber(form).then(
          res => {
            loadingdone()
            console.log(res)
            if( res.data.Data ) {
              console.log('新增成功')
              Native.handleBackAction(true)
            }
          }
        ).catch(
          e => {
            loadingdone()
            console.log(e)
          }
        )
      } else { //如果是编辑
        form.no = no
        console.log(form)
        // return
        loading()
        editAppointmentWithNumber(form).then(
          res => {
            loadingdone()
            console.log(res)
          }
        ).catch(
          e => {
            loadingdone()
            console.log(e)
          }
        )
      }
    }
    // 如果是无号
    else {
      form.name = $('#patient-name').val()
      form.phone = $('#patient-phone-number').val()
      console.log(form)
      // return
      // 如果是新增
      if(isAdd) {
        loading()
        newAppointmentWithOutNumber(form).then(
          res => {
            loadingdone()
            console.log(res)
            if(data.data.Data) {
              Native.handleBackAction(true)
            }
          }
        ).catch(
          e => {
            loadingdone()
            console.log(e)
          }
        )
      } else { //如果是编辑
        form.no = no
        loading()
        editAppointmentWithOutNumber(form).then(
          res => {
            loadingdone()
            console.log(res)
            Native.handleBackAction(true)
          }
        ).catch(
          e => {
            loadingdone()
            console.log(e)
          }
        )
      }
    }
  })
})

// 检查数据
function _validate() {
  return true
}

// 获取患者列表
function fetchPatients() {
  loading()
  fetchPatientList().then(
    res => {
      loadingdone()
      const data = res.data.Data
      console.log(data)
      let tempData = []
      for (let i in data) {
        tempData.push({
          text: data[i].name,
          value: data[i].blh,
          tel: data[i].blh
        })
      }
      patientSelector = window.mobiscroll.select('#patient-name', {
        theme: 'ios',
        display: 'bottom',
        minWidth: 200,
        data: tempData
      })
      // patientSelector.setVal()
      patientSelector.show()
    }
  ).catch(
    e => {
      loadingdone()
      console.log(e)
    }
  )
}

// 获取医生列表
function fetchDoctorSrcList() {
  loading()
  fetchDoctorList().then(
    res => {
      loadingdone()
      let doctorList = []
      console.log(res)
      var length = res.data.Data.length
      for (var i = 0; i < length; i++) {
        doctorList.push({ value: res.data.Data[i].id, text: res.data.Data[i].name })
      }
      doctorListSelector = window.mobiscroll.select('#doctor-name', {
        theme: 'ios',
        display: 'bottom',
        minWidth: 200,
        data: doctorList
      })
      doctorListSelector.show()
    }
  ).catch(
    e => {
      loadingdone()
      console.log(e)
    }
  )
}

// 删除
function handleDelete(no) {
  loading()
  deleteAppointment(no).then(
    res => {
      loadingdone()
      console.log(res)
      Native.handleBackAction(true)
    }
  ).catch(
    e => {
      loadingdone()
      console.log(e)
    }
  )
}

// 获取预约详情
function fetchAppointmentDetail() {
    if(WithNumer){
        getAppointmentDetailWithNumber(no).then(
            res => {
                const itemDetail = res.data.Data[0]
                // alert(JSON.stringify(res))
                $('#patient-name').html(itemDetail.name)
                $('#patient-name').val(itemDetail.blh)
                // $('#patient-phone-number').val(itemDetail.phone || 13000000000)
                $('#appointment-time').val(itemDetail.b_date)
                $('#duration').val(itemDetail.len)
                $('#content-text').val(itemDetail.content || '')
                // context
                // $('#doctor-name').val(itemDetail.doctname || '')
                $('#doctor-name').html(itemDetail.docname || '')
                $('#doctor-name').val(itemDetail.doctor)
            }
        ).catch(
            e => {
                console.log(e)
            }
        )
    }else {
        getAppointmentDetailWithoutNumber(no).then(
            res => {
                const itemDetail = res.data.Data[0]
                console.log(itemDetail)
                $('#patient-name').html(itemDetail.newname)
                $('#patient-name').val(itemDetail.blh)
                $('#patient-phone-number').val(itemDetail.newtel || '')
                $('#appointment-time').val(itemDetail.b_date)
                $('#duration').val(itemDetail.len)
                $('#content-text').val(itemDetail.newbz || '')
                // context
                // $('#doctor-name').val(itemDetail.doctname || '')
                $('#doctor-name').html(itemDetail.docname || '')
                $('#doctor-name').val(itemDetail.doctor)
            }
        ).catch(
            e => {
                console.log(e)
            }
        )
    }
  // const itemDetail = Native.getLocalParam('selectedAppointmentItem')

}

// 选好状态后更新
window.funSelectCallBack = function(value) {
  $('#content-text').val(value)
}

window.funRightTouch =  function () {
    GDialog.show()
}

