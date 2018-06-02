// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  // require('./page.html')
}
import './page.less'
require('@/lib/common.js')

import { fetchPatientList } from '@/api/patient'
import { Timer } from '@/lib/utils.js'

const patientInfos = require('@/components/patientInfos/patientInfos.js')

var patientList = []
// 复诊
var fzpatientList = []
// 初诊
var czpatientList = []
// 当前tab的值
var tabIndex = 0
// 当前时间
// var today = new Date()
// 改变的时间
// var changeIndex = 0
var timer = new Timer()
$(function() {
  updateDate()
  fetchData()
  // todo
  $('#tab ul li').on('click', function() {
    const $this = $(this)
    if ($this.hasClass('active')) {
      return
    } else {
      $(this).addClass('active').siblings().removeClass('active')
    }
    tabIndex = $this.index()
    updatePatients()
  })
  $('.left-arrow').on('click', () => {
    timer.minusOneDay()
    // changeIndex--
    updateDate()
    fetchData()
  })
  $('.right-arrow').on('click', () => {
    timer.addOneDay()
    // changeIndex++
    updateDate()
    fetchData()
  })
})

// 获取数据
function fetchData() {
  // fetchPatientList({ today: parseTime() }).then(
  fetchPatientList({ today: timer.getParsedTime() }).then(
    res => {
      patientList = res.data.Data
      updateTabs()
      updatePatients()
    }
  ).catch(
    e => {
      console.log(e)
    }
  )
}
// 更新date内值
function updateDate() {
  $('.detail-time-current').html(timer.getParsedTime())
}
// 更新tab内值
function updateTabs() {
  if (!patientList) return
  fzpatientList = patientList.filter((patient) => {
    return patient.cfz === '复诊患者'
  })
  czpatientList = patientList.filter((patient) => {
    return patient.cfz !== '复诊患者'
  })
  $('#tab>ul>li:first-child').html(`初诊患者(${czpatientList.length})`)
  $('#tab>ul>li:nth-child(2)').html(`复诊患者(${fzpatientList.length})`)
  $('#tab>ul>li:last-child').html(`当日全部(${patientList.length})`)
}
// 更新病历显示
function updatePatients() {
  let renderList = null
  switch (tabIndex) {
    case 0:
      renderList = czpatientList
      break
    case 1:
      renderList = fzpatientList
      break
    default:
      renderList = patientList
      break
  }
  patientInfos.render('patientInfos', {
    patientList: renderList
  })
}

// function parseTime() {
//   return moment(today).add(changeIndex, 'days').format('YYYY-MM-DD')
// }

