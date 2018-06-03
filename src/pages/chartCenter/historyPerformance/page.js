// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
require('@/lib/common.js')
const Native = require('@/lib/native.js')
import './page.less'
import { fetchHistoryPerformance } from '@/api/historyPerformance'

const items = ['就诊人数趋势图', '工作量趋势图', '回访次数趋势图']
let historyPerformanceData = {}
var today = new Date()

$(function() {
  getHistoryPerformance({ today: today.getFullYear() + '-' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) })
  $('#date').text(today.getFullYear() + '/' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))))

  $('.float-date-left').on('click', function() {
    if (today.getMonth() === 1) {
      today.setFullYear(today.getFullYear() - 1)
      today.setMonth(12)
    } else {
      today.setMonth(today.getMonth() - 1)
    }
    $('#date').text(today.getFullYear() + '/' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))))
    getHistoryPerformance({ today: today.getFullYear() + '-' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) })
  })

  $('.float-date-right').on('click', function() {
    if (today.getMonth() === 12) {
      today.setFullYear(today.getFullYear() + 1)
      today.setMonth(1)
    } else {
      today.setMonth(today.getMonth() + 1)
    }
    $('#date').text(today.getFullYear() + '/' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))))
    getHistoryPerformance({ today: today.getFullYear() + '-' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) })
  })

  $('#eye').on('click', function() {
    if ($('#eye').hasClass('eye-open')) {
      $('#allsf').css('display', 'none')
      $('.unit').css('display', 'none')
      $('.hide-num').css('display', 'inline-block')
      $('#eye').removeClass('eye-open').addClass('eye-close')
    } else {
      $('#allsf').css('display', 'inline-block')
      $('.unit').css('display', 'inline-block')
      $('.hide-num').css('display', 'none')
      $('#eye').removeClass('eye-close').addClass('eye-open')
    }
  })

  // todo
  $('#turn-to-new').on('click', function(e) {
    const index = $(this).parent().index()
    Native.startNextActivity({
      nexturl: HTML_BASE_URL_PREFIX + 'chartCenter/chart/page.html?type=1', // eslint-disable-line
      nextparam: '',
      title: items[index],
      flag: 1
    })
  })
  $('#turn-to-workload').on('click', function(e) {
    const index = $(this).parent().index()
    Native.startNextActivity({
            nexturl: HTML_BASE_URL_PREFIX + 'chartCenter/chart/page.html?type=2', // eslint-disable-line
      nextparam: '',
      title: items[index],
      flag: 1
    })
  })
  $('#turn-to-return').on('click', function(e) {
    const index = $(this).parent().index()
    Native.startNextActivity({
            nexturl: HTML_BASE_URL_PREFIX + 'chartCenter/chart/page.html?type=3', // eslint-disable-line
      nextparam: '',
      title: items[index],
      flag: 1
    })
  })
})

function getHistoryPerformance(today) {
  fetchHistoryPerformance(today).then(
        res => {
          historyPerformanceData = res
          updateData(historyPerformanceData)
        }
    ).catch(
        e => {
          console.log(e)
        }
    )
}

function updateData(data) {
  let days = []
  $('#allsf').text((data.data.Data.allsf || 0).toFixed(2))
  $('#mxhz').text(data.data.Data.mxhz + '人' || '0人')
  $('#mgjss').text(data.data.Data.mgjss + '元' || '0元')
  $('#mff').text(data.data.Data.mff + '次' || '0次')
  $('#date-title').text(today.getFullYear() + '/' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) + '业绩一览')
  if ('days' in data.data.Data) {
    days = data.data.Data.days
    $('#days').empty()
    $('#days').css('width', days.length * 25 + '%')
    for (var i = 0; i < days.length; i++) {
      $('#days').append('<li class="history-detail-content-list-item" style="width: ' + 100 / days.length + '%">' +
              '<div class="history-detail-content-list-item-header">' +
              '<span class="history-detail-content-list-item-header-day">' + getWeekDay(days[i].d.substring(0, 10)) + '</span>' +
              '</div>' +
              '<div class="history-detail-content-list-item-content">' +
              '<span class="history-detail-content-list-item-content-date">' + days[i].d.substring(8, 10) + '</span>' +
              '<div class="history-detail-content-list-item-content-detail">' +
              '<span class="history-detail-content-list-item-content-detail-first">' + (days[i].xhz || 0) + '人</span>' +
              '<span class="history-detail-content-list-item-content-detail-re">' + (days[i].fz || 0) + '人</span>' +
              '<span class="history-detail-content-list-item-content-detail-apponitment">' + (days[i].yy || 0) + '人</span>' +
              '<span class="history-detail-content-list-item-content-detail-miss">' + (days[i].ls || 0) + '人</span>' +
              '<span class="history-detail-content-list-item-content-detail-visit">' + (days[i].fz || 0) + '人</span>' +
              '</div>' +
              '<span class="history-detail-content-list-item-content-amount">' + (days[i].sf || 0).toFixed(2) + '元</span>' +
              '</div>' +
              '</li>')
    }
  }
}

function getWeekDay(dateString) {
  var date
  var dateArray = dateString.split('-')
  date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
  return '日一二三四五六'.charAt(date.getDay())
}
