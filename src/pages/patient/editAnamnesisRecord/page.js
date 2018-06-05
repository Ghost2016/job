if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchDoctorList } from '@/api/common'
const Native = require('@/lib/native.js')



var doctorListSelector = null
$(function() {
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
  window.mobiscroll.datetime('#date', optDateTime)
  // 切换性别
  $('#first-or-not-p>label').on('click', function(e) {
    $(this).children('span').addClass('is-checked')
    $(this).siblings('label').children('span').removeClass('is-checked')
  })



    $('#doctor-name-p').on('click', () => {
        if (doctorListSelector) {
            doctorListSelector.show()
        } else {
            fetchDoctorSrcList()
        }
    })
    $('#turn-to-mouth').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/checkAndEdit/page.html',
                nextparam: '',
                title: '检查编辑',
                flag:1,
            }
        )
    })
    $('#turn-to-auxiliary').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/checkAndEdit/page.html',
                nextparam: '',
                title: '检查编辑',
                flag:1,
            }
        )
    })
    $('#turn-to-diagnose').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/checkAndEdit/page.html',
                nextparam: '',
                title: '检查编辑',
                flag:1,
            }
        )
    })
    $('#turn-to-treat').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/checkAndEdit/page.html',
                nextparam: '',
                title: '检查编辑',
                flag:1,
            }
        )
    })
})


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

window.funRightTouch =  function () {
    alert('delete')
}


