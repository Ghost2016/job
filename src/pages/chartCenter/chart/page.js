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

var type = 1

let patientStatisticsData = {}
let chargeStatisticsData = {}
let returnStatisticsData = {}

$(function() {
  if (type === 1) {
    getPatientStatistics({ today: today.getFullYear() + '-' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) })
  } else if (type === 2) {
    getChargeStatistics({ today: today.getFullYear() + '-' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) })
  } else if (type === 3) {
    getReturnStatistics({ today: today.getFullYear() + '-' + (today.getMonth() > 8 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) })
  }
})

function getPatientStatistics(today) {
  fetchPatientStatistics(today).then(
        res => {
          patientStatisticsData = res
          if ('Data' in patientStatisticsData.data) {
            ChartBrief.render('chart-brief', patientStatisticsData.data.Data, type)
            if ('days' in patientStatisticsData.data.Data) {
              ChartDetail.render('chart-detail', patientStatisticsData.data.Data.days, type)
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
  fetchChargeStatistics(today).then(
        res => {
          chargeStatisticsData = res
          if ('Data' in chargeStatisticsData.data) {
            ChartBrief.render('chart-brief', chargeStatisticsData.data.Data, type)
            if ('days' in chargeStatisticsData.data.Data) {
              ChartDetail.render('chart-detail', chargeStatisticsData.data.Data, type)
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
  fetchReturnStatistics(today).then(
        res => {
          returnStatisticsData = res
          if ('Data' in returnStatisticsData.data) {
            ChartBrief.render('chart-brief', returnStatisticsData.data.Data, type)
            if ('days' in returnStatisticsData.data.Data) {
              ChartDetail.render('chart-detail', returnStatisticsData.data.Data, type)
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
