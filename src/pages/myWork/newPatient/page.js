// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
require('@/lib/common.js')
import './page.less'
import { newPatient } from '@/api/patient'
import { fetchPatientSrc, fetchDoctorList } from '@/api/common'
import { Timer } from '@/lib/utils'

// const native = require('@/lib/native.js')
// $('#app').html('通过jquery')
// window.location.href = '../../index/index/page.html'
// native.startNextActivity(
//   {
//     nexturl: '../../index/index/page.html',
//     title: 'bbc',
//     flag: 3
//   }
// )
$(function() {
  var patientSrc = []
  var doctorList = []
  fetchPatientSrc().then(
    res => {
      var length = res.data.Data.length
      for (var i = 0; i < length; i++) {
        patientSrc.push({ value: i, text: res.data.Data[i].name })
      }
      window.mobiscroll.select('#patient-src', {
        theme: 'ios',
        display: 'bottom',
        minWidth: 200,
        data: patientSrc
      })
      fetchDoctorList().then(
        res => {
          console.log(res)
          var length = res.data.Data.length
          for (var i = 0; i < length; i++) {
            doctorList.push({ value: res.data.Data[i].id, text: res.data.Data[i].name })
          }
          window.mobiscroll.select('#doctor-name', {
            theme: 'ios',
            display: 'bottom',
            minWidth: 200,
            data: doctorList
          })
        }
      ).catch(
        e => {
          console.log(e)
        }
      )
    }
  ).catch(
    e => {
      console.log(e)
    }
  )
  // alert($('#sex-p .is-checked').attr('data-sex'))

  // todo
  const GDialog = require('@/components/gDialog/gDialog.js')
  GDialog.render('gDialog', {
    titleText: '操作提示',
    contentText: '有必填项未完成，请先填写完成后在保存',
    ensureText: '确定',
    onEnsureClick: () => {
      GDialog.dismiss()
    }
  })
  $('#save').on('click', (e) => {
    if (validate()) {
      const form = {
        name: $('#patient-name').html(),
        phone: $('#patient-phone-number').html(),
        tel: $('#patient-tel-number').html(),
        sex: $('#sex-p .is-checked').attr('data-sex'),
        birth: $('#patient-birthday').val(),
        docid: $('#doctor-name').val() - 0,
        docname: $('#doctor-name')[0].textContent,
        hzsource: $('#patient-src')[0].textContent,
        address: '华阳'
      }
      newPatient(form).then(
        res => {
          console.log(res)
        }
      ).catch(
        e => {
          console.log(e)
        }
      )
    } else {
      GDialog.show()
    }
  })

  $('#patient-src-p').on('click', () => {
    window.mobiscroll.select('#patient-src', {
      theme: 'ios',
      display: 'bottom',
      minWidth: 200,
      data: patientSrc
    })
  })
  // 使用日期控件
  // var now = new Date()
  window.mobiscroll.date('#patient-birthday', {
    // theme: 'ios',
    display: 'bottom',
    dateFormat: 'yy-mm-dd',
    lang: 'zh'
    // setText: '确定',
    // onInit: function(event, inst) {
    //   inst.setVal(now, true)
    // }
  })
  // 切换性别
  $('#sex-p>label').on('click', function(e) {
    $(this).children('span').addClass('is-checked')
    $(this).siblings('label').children('span').removeClass('is-checked')
  })
  function validate() {
    return true
  }
})
