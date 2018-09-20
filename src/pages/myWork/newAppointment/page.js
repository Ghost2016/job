// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  // require('./page.html')
}
import './page.less'
require('@/lib/common.js')
import { newAppointmentWithOutNumber, newAppointmentWithNumber,
  deleteAppointment, editAppointmentWithOutNumber, editAppointmentWithNumber,getAppointmentDetailWithNumber,getAppointmentDetailWithoutNumber
} from '@/api/appointment'
import { fetchPatientList, fetchDoctorList } from '@/api/common'

import { getSearchParam,encodeUTF8,decodeUTF8 } from '@/lib/utils'
const GDialog = require('@/components/gDialog/gDialog.js')

// 新增 编辑
const isAdd = !getSearchParam('isEdit')
// 有号 无号 => 相对于病历号而言的
const WithNumer = getSearchParam('type') === 'yhyy'
// 删除或者编辑时会用到的预约号
var no = parseInt(getSearchParam('no')) || -1
// 弹出框
var patientSelector = null
var doctorListSelector = null

var patientBLH = getSearchParam('blh');
// 获取是否有患者
const patientName =decodeUTF8(getSearchParam('name'));
let timeSelector = null
$(function() {
    GDialog.render('gDialog', {
        titleText: '确定要删除数据吗',
        hasCancel: true,
        ensureText: '确定',
        cancelText: '取消',
        onEnsureClick: () => {
            GDialog.dismiss()
            handleDelete(no)
        },
        onCancelClick: () => {
            GDialog.dismiss()

        }
    })
  // loading()
  // window.mobiscroll.date('#appointment-time', {})
  // var currYear = (new Date()).getFullYear()
  // 如果是有号
  if (WithNumer) {
      $('#patient-phone-number-p').css('display','none')
    $('#patient-name-p').append(
      `<a id="patient-name"></a><span class="arraw-into"></span>`
    )
    // $('#patient-phone-number-p').append(
    //   `<input id="patient-phone-number" readonly placeholder=""></input>`
      // `<input id="patient-phone-number" placeholder=""></input>`
    // )
  } else {
    $('#patient-name-p').append(
      `<input id="patient-name" placeholder="请输入患者姓名"></input>`
    )
    $('#patient-phone-number-p').append(
      `<input id="patient-phone-number" placeholder="请输入电话号码"></input>`
    )
  }

  if (patientName!=undefined || patientName.length!=0)
  {
      $('#patient-name').html(patientName);
      $('#patient-name').val(patientName);
  }

    if (patientBLH!=undefined || patientBLH.length!=0)
    {
        $('#patient-name').val(patientBLH);
    }


    if (!isAdd) {
    fetchAppointmentDetail()
  }
  // 只有有号才会触发
  if(WithNumer) {
    // 病人
    $('#patient-name-p').on('click', () => {
      if (patientSelector) {
        patientSelector.show()
      } else {
        fetchPatients()
      }
    })
  }
  // 医生
  $('#doctor-name-p').on('click', () => {
    if (doctorListSelector) {
      doctorListSelector.show()
    } else {
      fetchDoctorSrcList()
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
  window.mobiscroll.datetime('#appointment-time', optDateTime)
  // 就诊时长
  timeSelector = window.mobiscroll.time('#duration', {
    // theme: 'ios',
    display: 'bottom',
    // timeFormat: `i'min'`,
    timeFormat: `H'小时'i'分钟'`,
    steps: {
      // minute:15
    },
    lang: 'zh',
    defaultValue: new Date(1970, 1, 1, 1, 30, 0)
  })
  $('#save').on('click', () => {
      if (!_validate()) {
          return
      }
    const form = {
      // 没有这一条件
      // blh : $('#patient-name').val(),
      // 没有这一条件
      // ppn : $('#patient-phone-number').val(),
      date : $('#appointment-time').val(),
      // len : parseInt($('#duration').val()) || 0,
      len : getTimeLen($('#duration').val()),
      content : $('#content-text').val(),
      docid :$('#doctor-name_dummy').val()
    }

      if ($('#doctor-name_dummy').length == 0) {
          form.docname = $('#doctor-name').html();

      }


    console.log(form)
    // return

    // 如果是有号
    if(WithNumer) {
      form.blh = $('#patient-name').val();
      form.docid = $('#doctor-name').val();
      // 如果是新增
      if(isAdd) {
        loading()
        console.log('form', form)
        // return
        newAppointmentWithNumber(form).then(
          res => {
            loadingdone()
            console.log(res)
            if( res.data.Data ) {
                Native.showToast('新增有号预约成功')
              Native.handleBackAction(true)
            }
          }
        ).catch(
          e => {
            loadingdone()
            console.log(e)
          }
        )
      } else { //如果是编辑
        form.no = no;
        console.log(form)
        // return
        loading()
        editAppointmentWithNumber(form).then(
          res => {
            loadingdone()
             Native.showToast('编辑成功')
             Native.handleBackAction(true)
            console.log(res)
          }
        ).catch(
          e => {
            loadingdone()
            console.log(e)
          }
        )
      }
    }
    // 如果是无号
    else {
      form.name = $('#patient-name').val()
      form.phone = $('#patient-phone-number').val();
      form.docid = $('#doctor-name').val();
      console.log(form)
      // return
      // 如果是新增
      if(isAdd) {
        loading()
        newAppointmentWithOutNumber(form).then(
          res => {
            loadingdone()
            console.log(res)
            if(res.data.Data) {
              Native.showToast('新增无号预约成功')
              Native.handleBackAction(true)
            }
          }
        ).catch(
          e => {
            loadingdone()
            console.log(e)
          }
        )
      } else { //如果是编辑
        form.no = no
        loading()
        editAppointmentWithOutNumber(form).then(
          res => {
            loadingdone()
            console.log(res)
              Native.showToast('编辑成功')
            Native.handleBackAction(true)
          }
        ).catch(
          e => {
            loadingdone()
            console.log(e)
          }
        )
      }
    }
  })
})

// 检查数据
function _validate() {
    var name =  $('#patient-name').val();
    if (name.length == 0)
    {
        Native.showToast('请选择患者姓名');
        return false;
    }

    if(!WithNumer) {
        var phone =  $('#patient-phone-number').val();
        if (phone.length == 0)
        {
            Native.showToast('请输入手机号码');
            return false;
        }
    }

    var date =  $('#appointment-time').val();
    if (date == undefined || date.length == 0)
    {
        Native.showToast('请选择时间');
        return false;
    }

    if (!parseInt($('#duration').val()) || parseInt($('#duration').val())<=0)
    {
        Native.showToast('请选择时长');
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

// 获取患者列表
function fetchPatients() {
    Native.selectPatient();
  // loading()
  // fetchPatientList().then(
  //   res => {
  //     loadingdone()
  //     const data = res.data.Data
  //     console.log(data)
  //     let tempData = []
  //     for (let i in data) {
  //       tempData.push({
  //         text: data[i].name,
  //         value: data[i].blh,
  //         tel: data[i].blh
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
        data: doctorList,
          lang: 'zh'
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

// 删除
function handleDelete(no) {
  loading()
  deleteAppointment(no).then(
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

// 获取预约详情
function fetchAppointmentDetail() {
    if(WithNumer){
        getAppointmentDetailWithNumber(no).then(
            res => {
              const itemDetail = res.data.Data[0]
                let minute = itemDetail.len % 60;
                let hour = parseInt(itemDetail.len /60)
                timeSelector.setVal(new Date(1970, 1, 1, hour, minute, 0))
                
                $('#patient-name').html(itemDetail.name)
                $('#patient-name').val(itemDetail.blh)
                // $('#patient-phone-number').val(itemDetail.phone || 13000000000)
                $('#appointment-time').val(itemDetail.b_date)
                // $('#duration').val(itemDetail.len)
                $('#duration').val(`${hour}小时${minute}分钟`)
                $('#content-text').val(itemDetail.content || '')
                // context
                // $('#doctor-name').val(itemDetail.doctname || '')
                $('#doctor-name').html(itemDetail.docname || '')
                $('#doctor-name').val(itemDetail.doctor)
            }
        ).catch(
            e => {
                console.log(e)
            }
        )
    }else {
        getAppointmentDetailWithoutNumber(no).then(
            res => {
                const itemDetail = res.data.Data[0]
                console.log(itemDetail)
                $('#patient-name').val(itemDetail.newname)

                $('#patient-phone-number').val(itemDetail.newtel || '')
                $('#appointment-time').val(itemDetail.b_date)
                $('#duration').val(itemDetail.len)
                $('#content-text').val(itemDetail.newbz || '')
                // context
                // $('#doctor-name').val(itemDetail.doctname || '')
                $('#doctor-name').html(itemDetail.docname || '')
                $('#doctor-name').val(itemDetail.doctor)
            }
        ).catch(
            e => {
                console.log(e)
            }
        )
    }
  // const itemDetail = Native.getLocalParam('selectedAppointmentItem')

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
window.funRightTouch =  function () {
    GDialog.show()
}

function getTimeLen(timeText){
  const arr = timeText.split(/小时|分钟/)
  return arr[0] * 60 + arr[1] * 1
}