// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
require('@/lib/common.js')
import './page.less'
import { newPatient, fetchPatientDetailByBlh, deletePatientByBlh, editPatient } from '@/api/patient'
import { fetchPatientSrc, fetchDoctorList } from '@/api/common'

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
var patientSrc = []
var patientSrcSelector = null
var doctorList = []
var doctorListSelector = null
var isAdd = false
var blh = 0
$(function() {
  if (!isAdd) {
    fetchPatientDetailByBlh().then(
      res => {
        console.log(res)
        blh = res.data.Data[0].blh
        fillData(res.data.Data)
      }
    ).catch(
      e => {
        console.log(e)
      }
    )
  }
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
        name: $('#patient-name').val(),
        phone: $('#patient-phone-number').val(),
        tel: $('#patient-tel-number').val(),
        sex: $('#sex-p .is-checked').attr('data-sex'),
        birth: $('#patient-birthday').val(),
        docid: $('#doctor-name').val() - 0,
        // 封装后的结果
        docname: $('#doctor-name_dummy').val(),
        hzsource: $('#patient-src')[0].textContent,
        address: $('#patient-addr').html()
      }
      console.log(form)
      return
      if (isAdd) {
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
        form.blh = blh
        editPatient(form).then(
          res => {
            console.log(res)
          }
        ).catch(
          e => {
            console.log(e)
          }
        )
      }
    } else {
      GDialog.show()
    }
  })
  // 患者来源
  $('#patient-src-p').on('click', () => {
    if (patientSrcSelector) {
      patientSrcSelector.show()
    } else {
      fetchPatientSrcList()
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

  // 使用日期控件
  window.mobiscroll.date('#patient-birthday', {
    // theme: 'ios',
    display: 'bottom',
    dateFormat: 'yy-mm-dd',
    lang: 'zh'
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

// 获取医生列表
function fetchDoctorSrcList() {
  fetchDoctorList().then(
    res => {
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

// 获取患者来源列表
function fetchPatientSrcList() {
  fetchPatientSrc().then(
    res => {
      var length = res.data.Data.length
      for (var i = 0; i < length; i++) {
        patientSrc.push({ value: i, text: res.data.Data[i].name })
      }
      patientSrcSelector = window.mobiscroll.select('#patient-src', {
        theme: 'ios',
        display: 'bottom',
        minWidth: 200,
        data: patientSrc
      })
      patientSrcSelector.show()
    }
  ).catch(
    e => {
      console.log(e)
    }
  )
}
// 填充数据
function fillData(data) {
  data = [
    {
      'name': '测试2',
      'sex': '男',
      'age': '18岁',
      'cfz': '复诊患者',
      'xfje': null,
      'qf': null,
      'blh': 1703076588,
      'ys': '',
      'jzsj': '2018-05-25 01:23:03',
      'yysj': null,
      'yybz': null,
      'bl': null
    }
  ][0]
  console.log(data)
  $('#patient-name').val(data.name),
  $('#patient-phone-number').val(),
  $('#patient-tel-number').val(),
  $('#sex-p .is-checked').attr('data-sex'),
  $('#patient-birthday').val(),
  $('#doctor-name').val() - 0,
  $('#doctor-name')[0].textContent,
  $('#patient-src')[0].textContent,
  $('#patient-addr').val()
}
// 删除
function deletePatient() {
  deletePatientByBlh(blh).then(
    res => {
      console.log(res)
    }
  ).catch(
    e => {
      console.log(e)
    }
  )
}
