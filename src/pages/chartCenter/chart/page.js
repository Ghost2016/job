// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
require('@/lib/common.js')
import './page.less'
import { fetchPatientStatistics } from '@/api/chart'
import { fetchChargeStatistics } from '@/api/chart'
import { fetchReturnStatistics } from '@/api/chart'
const ChartBrief = require('@/components/chartBrief/chartBrief')
const ChartDetail = require('@/components/chartDetail/chartDetail')

var today = new Date()

var type = getSearchParam('type') - 0 || 1

var patientStatisticsData = {}
var chargeStatisticsData = {}
var returnStatisticsData = {}

$(function() {
  updateData()
  $('#chart-detail').on('click','.left-arrow',function () {
      if (today.getMonth() === 1) {
          today.setFullYear(today.getFullYear() - 1)
          today.setMonth(12)
      } else {
          today.setMonth(today.getMonth() - 1)
      }
      updateData()
  })
    $('#chart-detail').on('click','.right-arrow',function () {
        if (today.getMonth() === 12) {
            today.setFullYear(today.getFullYear() + 1)
            today.setMonth(1)
        } else {
            today.setMonth(today.getMonth() + 1)
        }
        updateData()
    })
})

function updateData() {
    if (type === 1) {
        getPatientStatistics({ today: today.getFullYear() + '-' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) })
    } else if (type === 2) {
        getChargeStatistics({ today: today.getFullYear() + '-' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) })
    } else if (type-0 === 3) {
      getReturnStatistics({ today: today.getFullYear() + '-' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) })
    }
}

function getPatientStatistics(today) {
    loading()
  fetchPatientStatistics(today).then(
        res => {
            loadingdone()
          patientStatisticsData = res
          if ('Data' in patientStatisticsData.data) {
            ChartBrief.render('chart-brief', patientStatisticsData.data.Data, type)
            if ('days' in patientStatisticsData.data.Data) {
              ChartDetail.render('chart-detail', patientStatisticsData.data.Data.days, type)
                $('#chart-detail').children().children().first().children('._chart-detail-time-current').text(today.today.substring(0,4) + '/' + today.today.substring(5,7))
            }
          }
        }
    ).catch(
        e => {
          console.log(e)
        }
    )
}

function getChargeStatistics(today) {
    loading()
  fetchChargeStatistics(today).then(
        res => {
            loadingdone()
          chargeStatisticsData = res
          if ('Data' in chargeStatisticsData.data) {
            ChartBrief.render('chart-brief', chargeStatisticsData.data.Data, type)
            if ('days' in chargeStatisticsData.data.Data) {
              ChartDetail.render('chart-detail', chargeStatisticsData.data.Data.days, type)
              $('#chart-detail').children().children().first().children('._chart-detail-time-current').text(today.today.substring(0,4) + '/' + today.today.substring(5,7))
            }
          }
        }
    ).catch(
        e => {
          console.log(e)
        }
    )
}

function getReturnStatistics(today) {
    loading()
  fetchReturnStatistics(today).then(
        res => {
          loadingdone()
          returnStatisticsData = res
          console.log(returnStatisticsData)
          if ('Data' in returnStatisticsData.data) {
            ChartBrief.render('chart-brief', returnStatisticsData.data.Data, type)
            if ('days' in returnStatisticsData.data.Data) {
              ChartDetail.render('chart-detail', returnStatisticsData.data.Data.days, type)
              $('#chart-detail').children().children().first().children('._chart-detail-time-current').text(today.today.substring(0,4) + '/' + today.today.substring(5,7))
            }
          }
        }
    ).catch(
        e => {
          console.log(e)
        }
    )
}

function updateBrief() {

}

function updateDetail() {

}
