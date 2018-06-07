// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
import './page.less'
require('@/lib/common.js')

import { fetchPatientList, fetchDoctorList } from '@/api/common'
import { addReturnVisit, editReturnVisit, deleteReturnVisit,getReturnVisit } from '@/api/returnVisit'
import { getSearchParam } from '@/lib/utils'
const Native = require('@/lib/native.js')
const GDialog = require('@/components/gDialog/gDialog.js')
// 如果是进行添加
var isAdd = getSearchParam('isEdit') ? false : true
// var isAdd = 0
// var sid = 14
// alert(isAdd)
var sid = parseInt(getSearchParam('sid'))
var statusSelector = null
var patientSelector = null
var doctorListSelector = null

var patientBLH;

$(function() {
    GDialog.render('gDialog', {
        titleText: '确定要删除数据吗',
        hasCancel: true,
        ensureText: '确定',
        cancelText: '取消',
        onEnsureClick: () => {
            GDialog.dismiss()
            deleteVisit(sid)
        },
        onCancelClick: () => {
            GDialog.dismiss()

        }
    })


  if (!isAdd) {
    const patientInfos = require('@/components/patientInfos/patientInfos.js')
    // patientInfos.render('patient-info', {
    //   a: 1
    // })
      fetchReturnVisitDetail(sid)
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
  // 病人
  $('#patient-name-p').on('click', () => {
    if (patientSelector) {
      patientSelector.show()
    } else {
      fetchPatients()
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
  $('#save').on('click', () => {
    
    if (validate()) {
      const form = {
        blh: $('#patient-name').val(),
        date: $('#current-return-visit-time').val(),
        content: $('#content-text').val(),
        docid: $('#doctor-name').val(),
        state: $('#status_dummy').val(),
        result: $('#visit-result').val()
      }
      console.log(form)
      // return
      if (isAdd) {
        loading()
        addReturnVisit(form).then(
          res => {
            loadingdone()
            console.log(res)
            if (res.data.Data) {
              Native.showToast('新增回访成功')
              Native.handleBackAction(true)
            }
          }
        ).catch(
          e => {
            loadingdone()
            console.log(e)
          }
        )
      } else {
        form.sid = sid
        loading()
        editReturnVisit(form).then(
          res => {
            loadingdone()
            console.log(res)
            if (res.data.Data) {

              Native.showToast('修改成功')
              Native.handleBackAction(true)
            }
          }
        ).catch(
          e => {
            loadingdone()
            console.log(e)
          }
        )
      }
    } else {

    }
  })

  $('#content-text-p').on('click', () => {
    Native.startNextActivity(
      {
        nexturl: HTML_BASE_URL_PREFIX + `myWork/appointmentContent/page.html?isAppointment=true`,
        title: `选择内容`,
        flag: 5
      }
    )
  })
})

// 获取患者列表
function fetchPatients() {
    Native.selectPatient();
  // loading()
  // fetchPatientList().then(
  //   res => {
  //     loadingdone()
  //     const data = res.data.Data
  //     let tempData = []
  //     for (let i in data) {
  //       tempData.push({
  //         text: data[i].name,
  //         value: data[i].blh
  //       })
  //     }
  //     patientSelector = window.mobiscroll.select('#patient-name', {
  //       theme: 'ios',
  //       display: 'bottom',
  //       minWidth: 200,
  //       data: tempData
  //     })
  //     // patientSelector.setVal()
  //     patientSelector.show()
  //   }
  // ).catch(
  //   e => {
  //     loadingdone()
  //     console.log(e)
  //   }
  // )
}

// 获取医生列表
function fetchDoctorSrcList() {
  loading()
  fetchDoctorList().then(
    res => {
      loadingdone()
      let doctorList = []
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
      loadingdone()
      console.log(e)
    }
  )
}
// 验证
function validate() {

    var name =  $('#patient-name').val();
    if (name.length == 0)
    {
        Native.showToast('请选择患者姓名');
        return false;
    }


    var date =  $('#current-return-visit-time').val();
    if (date == undefined || date.length == 0)
    {
        Native.showToast('请选择时间');
        return false;
    }

    var status = $('#status_dummy').val();
    if (status == undefined || status.length == 0)
    {
        Native.showToast('请选择状态');
        return false;
    }

    var dName =  $('#doctor-name').val()+'';
    if (dName == undefined || dName.length == 0)
    {
        Native.showToast('请选择医生');
        return false;
    }

    var hzSource =$('#content-text').val()+'';
    if (hzSource == undefined || hzSource.length == 0)
    {
        Native.showToast('请选择内容');
        return false;
    }

  return true
}
// 删除
function deleteVisit(sid) {
  loading()
  deleteReturnVisit(sid).then(
    res => {
      loadingdone()
      console.log(res)
      Native.handleBackAction(true)
    }
  ).catch(
    e => {
      loadingdone()
      console.log(e)
    }
  )
}

//获取回访详情
function fetchReturnVisitDetail(sid) {
    getReturnVisit(sid).then(
        res => {
            const itemDetail = res.data.Data[0]
            $('#patient-name').html(itemDetail.name)
            $('#patient-name').val(itemDetail.blh)
            $('#current-return-visit-time').val(itemDetail.ffdate)
            $('#status').html(itemDetail.isff)
            $('#status').val(itemDetail.isff)
            $('#content-text').val(itemDetail.ffcontext)
            $('#doctor-name').html(itemDetail.docname)
            $('#doctor-name').val(itemDetail.doctid)
            $('#visit-result').val(itemDetail.ffyj)
        }
    ).catch(
        e => {
            console.log(e)
        }
    )
}


// 选好状态后更新
window.funSelectCallBack = function(value) {

    try
    {
        var object = JSON.parse(value);

        if(object.type == 'patient')
        {
            patientBLH = object.blh;
            $('#patient-name').val(object.blh);
            $('#patient-name').html(object.name);
        }
        else {
            $('#content-text').val(value)
        }
    }catch (e)
    {
        $('#content-text').val(value)
    }

}
// // 选好状态后更新
// window.funSelectCallBack = function(value) {
//   $('#content-text').val(value)
// }

window.funRightTouch =  function () {
    GDialog.show()
}