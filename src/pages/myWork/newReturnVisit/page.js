// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
import './page.less'
require('@/lib/common.js')

import { fetchPatientList, fetchDoctorList } from '@/api/common'
import { addReturnVisit, editReturnVisit, deleteReturnVisit } from '@/api/returnVisit'

// 如果是进行添加
var isAdd = true
var sid = 0
var statusSelector = null
var patientSelector = null
var doctorListSelector = null
$(function() {
  if (!isAdd) {
    const patientInfos = require('@/components/patientInfos/patientInfos.js')
    patientInfos.render('patient-info', {
      a: 1
    })
  }

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
  window.mobiscroll.datetime('#current-return-visit-time', optDateTime)
  $('#status-p').on('click', () => {
    if (statusSelector) {
      statusSelector.show()
    } else {
      statusSelector = window.mobiscroll.select('#status', {
        theme: 'ios',
        display: 'bottom',
        minWidth: 200,
        data: [{
          text: '未回访',
          value: 0
        }, {
          text: '已回访',
          value: 1
        }]
      })
      statusSelector.setVal($('#status').attr('data') || 0)
      statusSelector.show()
    }
  })
  // 病人
  $('#patient-name-p').on('click', () => {
    if (patientSelector) {
      patientSelector.show()
    } else {
      fetchPatients()
    }
  })
  // 医生
  $('#doctor-name-p').on('click', () => {
    if (doctorListSelector) {
      doctorListSelector.show()
    } else {
      fetchDoctorSrcList()
    }
  })
  $('#save').on('click', () => {
    
    if (validate()) {
      const form = {
        blh: $('#patient-name').val(),
        date: $('#current-return-visit-time').val(),
        content: $('#content-text').val(),
        docid: $('#doctor-name').val(),
        state: $('#status_dummy').val(),
        result: $('#visit-result').val()
      }
      console.log(form)
      return
      if (isAdd) {
        addReturnVisit(form).then(
          res => {
            console.log(res)
            if (res.data.Data) {
              alert('新增成功')
            }
          }
        ).catch(
          e => {
            console.log(e)
          }
        )
      } else {
        form.sid = sid
        editReturnVisit(form).then(
          res => {
            console.log(res)
            if (res.data.Data) {
              alert('修改成功')
            }
          }
        ).catch(
          e => {
            console.log(e)
          }
        )
      }
    } else {
      alert('验证不通过')
      // GDialog.show()
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
})

// 获取患者列表
function fetchPatients() {
  fetchPatientList().then(
    res => {
      const data = res.data.Data
      let tempData = []
      for (let i in data) {
        tempData.push({
          text: data[i].name,
          value: data[i].blh
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
      console.log(e)
    }
  )
}

// 获取医生列表
function fetchDoctorSrcList() {
  fetchDoctorList().then(
    res => {
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
      console.log(e)
    }
  )
}
// 验证
function validate() {
  return true
}
// 删除
function deleteVisit() {
  deleteReturnVisit().then(
    res => {
      console.log(res)
    }
  ).catch(
    e => {
      console.log(e)
    }
  )
}

// 选好状态后更新
window.funSelectCallBack = function(value) {
  $('#content-text').val(value)
}