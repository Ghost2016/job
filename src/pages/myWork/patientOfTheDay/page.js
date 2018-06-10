// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  // require('./page.html')
}
import './page.less'
require('@/lib/common.js')

import { fetchPatientList } from '@/api/patient'
import { Timer } from '@/lib/utils.js'
import { getSearchParam } from '@/lib/utils'

const patientInfos = require('@/components/patientInfos/patientInfos.js')
const Native = require('@/lib/native.js')

var patientList = []
// 复诊
var fzpatientList = []
// 初诊
var czpatientList = []
// 当前tab的值
var tabIndex = getSearchParam('type') === 'fz' ? 1 : 0
// 当前时间
// var today = new Date()
// 改变的时间
// var changeIndex = 0
$(function() {
  $(`#tab>ul>li:eq(${tabIndex})`).addClass('active').siblings().removeClass('active')
  var timer = new Timer({
    LeftArrowId: 'left-arrow',
    RightArrowId: 'right-arrow',
    TextId: 'timer-text',
    regFormat: 'YYYY年MM月DD日',
    onAdd: function(date) {
      fetchData(date)
    },
    onMinus: function(date) {
      fetchData(date)
    },
    onChange: function(date) {
      fetchData(date)
    }
  })
  $('#appointment-time').on('click', function() {
    timer.show()
  })
  fetchData(timer.getParsedTime())
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

    $('#patientInfos').on('click','._patient-info',function (e) {
      var blh = $(e.currentTarget).children('._patient-info-bottom').children().first().children().last().html()
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/patientDetail/page.html?blh=' + blh,
                nextparam: '',
                title: '患者详情',
                flag:1,
            }
        )
    })
})

// 获取数据
function fetchData(date) {
  // fetchPatientList({ today: parseTime() }).then(
  loading()
  fetchPatientList({ today: date }).then(
    res => {
      loadingdone()
      patientList = res.data.Data
      updateTabs()
      updatePatients()
    }
  ).catch(
    e => {
      loadingDone()
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

