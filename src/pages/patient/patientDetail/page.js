if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchPatientDetail } from '@/api/patientDetail'

let patientDetailData = {}
$(function() {
  getPatientDetail({ blh: '32054077' })
})

function getPatientDetail(blh) {
  fetchPatientDetail(blh).then(
        res => {
          patientDetailData = res
          updateData(patientDetailData)
        }
    ).catch(
        e => {
          console.log(e)
        }
    )
}

function updateData(data) {
  if ('Data' in data.data) {
    if (data.data.Data[0].sex && data.data.Data[0].age) {
      $('#sex-age').text(data.data.Data[0].sex + ' ' + data.data.Data[0].age)
    }
    if (data.data.Data[0].blh) {
      $('#blh').text('病历号 ' + data.data.Data[0].blh)
    }
    if (data.data.Data[0].name) {
      $('#name').text(data.data.Data[0].name.replace(/\d*/g, ''))
    }
    if (data.data.Data[0].ys) {
      $('#doctor').text(data.data.Data[0].ys)
    }
    $('#xfje').text((data.data.Data[0].xfje || 0) + '元')
    $('#qf').text((data.data.Data[0].qf || 0) + '元')
    if (data.data.Data[0].jzsj) {
      $('#jzsj').text(data.data.Data[0].jzsj)
    }
    if (data.data.Data[0].hfsj) {
      $('#hfsj').text(data.data.Data[0].hfsj)
    }
    if (data.data.Data[0].yysj) {
      $('#yysj').text(data.data.Data[0].yysj)
    }
    if (data.data.Data[0].yybz) {
      $('#yybz').text(data.data.Data[0].yybz)
    }
  }
}
