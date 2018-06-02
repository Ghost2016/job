// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
import './page.less'
require('@/lib/common.js')

import { fetchPatientList } from '@/api/common'
import { addReturnVisit, editReturnVisit, deleteReturnVisit } from '@/api/returnVisit'

// 如果是进行添加
var isAdd = true
var patientSelector = null
var sid = 0
var statusSelector = null
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

  $('#patient-name-p').on('click', () => {
    if (patientSelector) {
      patientSelector.show()
    } else {
      fetchPatients()
    }
  })
})

// 获取患者列表
function fetchPatients() {
  fetchPatientList().then(
    res => {
      const data = res.data.Data
      data.map((item) => {
        item.text = item.name
        item.value = item.blh
      })
      console.log(data)
      patientSelector = mobiscroll.select('#patient-name', {
        theme: 'ios',
        display: 'bottom',
        minWidth: 200,
        data: data
      })
      patientSelector.show()
    }
  ).catch(
    e => {

    }
  )
}
