if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchPatientDetail } from '@/api/patientDetail'
import { getSearchParam,encodeUTF8,decodeUTF8 } from '@/lib/utils'
const Native = require('@/lib/native.js')

let patientDetailData = {}
let patientName = ''
let blh = getSearchParam('blh')||'32054077'
let phone = '';
let bname='';
let address = '';
let latp;
let lonp;
$(function() {
  getPatientDetail({ blh: blh })
    $('#turn-to-payment').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/paymentRecord/page.html?blh=' + blh,
                nextparam: '',
                title: $(this).html(),
                flag:1,
            }
        )
    })
    $('#turn-to-anamnesis').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/anamnesisList/page.html?blh=' + blh,
                nextparam: '',
                title: '病历列表',
                flag:6,
            }
        )
    })
    $('#turn-to-return').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/returnVisitRecordToSinglePerson/page.html?blh=' + blh,
                nextparam: '',
                title: patientName + '的回访',
                flag:6,
            }
        )
    })
    $('#turn-to-outwork').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/outWorkInfo/page.html?blh=' + blh,
                nextparam: '',
                title: '外加工信息',
                flag:1,
            }
        )
    })
    $('#turn-to-appointment').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/appointmentWithSinglePerson/page.html?blh=' + blh,
                nextparam: '',
                title: patientName + '的预约',
                flag:6,
            }
        )
    })
    $('#turn-to-appointment-edit').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'myWork/newAppointment/page.html?type=yhyy&blh='+blh+'&name='+encodeUTF8(patientName),
                // nexturl: HTML_BASE_URL_PREFIX + 'myWork/newAppointment/page.html?isEdit=' + false + '&type=yhyy',
                // nexturl: HTML_BASE_URL_PREFIX + 'myWork/newAppointment/page.html?type=yhyy&name='+$('#name').html(),
                nextparam: '',
                title: '新增有号预约',
                flag:1,
            }
        )
    })
    $('#turn-to-message').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/messageSend/page.html?phone='+phone,
                nextparam: '',
                title: $(this).html(),
                flag:7,
            }
        )
    })
    $('#turn-to-phone').on('click',function (e) {
        window.js.invokeCall(phone);
    })

    $('#turn-to-address').on('click',function (e) {
        if(address.length>0)
        {
            window.js.showLocationAddress(address);

        }

    })



    $('#turn-to-patient-edit').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'myWork/newPatient/page.html?isEdit=1&blh=' + blh,
                nextparam: '',
                title: '编辑患者',
                flag:8,
            }
        )
    })
})

function getPatientDetail(blh) {
    loading()
  fetchPatientDetail(blh).then(
        res => {
            loadingdone()
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
      if(data.data.Data[0].sex === '女') {
        $('.male').addClass('female')
      }
    }
    if (data.data.Data[0].blh) {
      $('#blh').text('病历号 ' + data.data.Data[0].blh)
    }
    if (data.data.Data[0].name) {
        patientName = data.data.Data[0].name.replace(/\d*/g, '')
      $('#name').text(data.data.Data[0].name.replace(/\d*/g, ''))
    }
    if (data.data.Data[0].ys) {
      $('#doctor').text(data.data.Data[0].ys)
    }
    $('#xfje').text((data.data.Data[0].xfje || 0) + '元')
    $('#qf').text((data.data.Data[0].qf || 0) + '元')
    // alert(JSON.stringify(data.data.Data[0]))
    if (data.data.Data[0].bl) {
      $('#bl').text(data.data.Data[0].bl)
    }
    if (data.data.Data[0].jzsj) {
      $('#jzsj').text(data.data.Data[0].jzsj)
    }
    if (data.data.Data[0].ff) {
      $('#hfsj').text(data.data.Data[0].ff)
    }
    if (data.data.Data[0].yysj) {
      $('#yysj').text(data.data.Data[0].yysj)
    }
    if (data.data.Data[0].yybz) {
      $('#yybz').text(data.data.Data[0].yybz)
    }


      if (data.data.Data[0].yybz) {
          $('#patient-brief-number').text(data.data.Data[0].yybz)
      }



      if (data.data.Data[0].address)
      {
          address = data.data.Data[0].address;
      }

    if (data.data.Data[0].phone)
    {
        phone = data.data.Data[0].phone;
    }
  }
}
