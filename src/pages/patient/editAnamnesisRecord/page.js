if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchDoctorList } from '@/api/common'
import { addAnamnesis } from '@/api/anamnesis'

const Native = require('@/lib/native.js')

const isAdd = !getSearchParam('isEdit')
// 前一个页面传递病历号
const blh = getSearchParam('blh') || 32030515
const seeno = getSearchParam('seeno') || 0
const name = getSearchParam('name') || ''
// 操作员
const operater = 5
// 口腔检查集合，有0-n条记录
const checks = []
// 辅助检查（X光）
const others = []
// 诊断记录
const diagnoses = []
// 治疗计划
const plans = []
// 治疗过程
const cures = []

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
                nexturl: HTML_BASE_URL_PREFIX + 'patient/checkAndEdit/page.html?type=checks',
                nextparam: '',
                title: '检查编辑',
                flag:5,
            }
        )
    })
    $('#turn-to-auxiliary').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/checkAndEdit/page.html?type=others',
                nextparam: '',
                title: '检查编辑',
                flag:5,
            }
        )
    })
    $('#turn-to-diagnose').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/checkAndEdit/page.html?type=diagnoses',
                nextparam: '',
                title: '检查编辑',
                flag:5,
            }
        )
    })
    $('#turn-to-treat').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/checkAndEdit/page.html?type=plans',
                nextparam: '',
                title: '检查编辑',
                flag:5,
            }
        )
    })
    // 点击保存
    $('#save').on('click', () => {
        let form = {
            blh: blh,
            seedate: $('#date').val(),
            czfz: $('#first-or-not-p .is-checked').attr('data-type'),
            doctor: $('#doctor-name').val() - 0,
            narrate: $('#narrate').val(),
            ext1: $('#ext1').val(),
            history: $('#history').val(),
            operater: operater,
            name:name,
            advice: $('#advice').html(),
            docname: $('#doctor-name_dummy').val(),
            checks: checks,
            others: others,
            diagnoses: diagnoses,
            plans: plans,
            cures: cures,
        }
        loading()
        addAnamnesis(form).then(
            res => {
                loadingdone()
                if( res.data.Data ) {
                    console.log('新增成功')
                    Native.handleBackAction(true)
                  }
            }
        ).catch(
            e => {
                loadingdone()
                console.log('e')
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

window.funSelectCallBack = function(jsonString) {
    var { array, type } = JSON.parse(jsonString)
    array.forEach((ele,index) => {
        let tempObj = {
            
        }
        switch(type) {
            case 'checks':
                checks.push({
                    blh: blh,
                    seeno: seeno,
                    wcheck:ele.text,
                    p1: ele.p1,
                    p2: ele.p2,
                    p3: ele.p3,
                    p4: ele.p4,
                    numb:ele.id,
                    wcheck:ele.text
                })
                break;
            case 'others':
                others.push({
                    blh: blh,
                    seeno: seeno,
                    wcheck:ele.text,
                    p1: ele.p1,
                    p2: ele.p2,
                    p3: ele.p3,
                    p4: ele.p4,
                    numb:ele.id,
                    desc1:ele.text
                })
                break;
            case 'diagnoses':
                diagnoses.push({
                    blh: blh,
                    seeno: seeno,
                    wcheck:ele.text,
                    p1: ele.p1,
                    p2: ele.p2,
                    p3: ele.p3,
                    p4: ele.p4,
                    numb:ele.id,
                    diagnose:ele.text
                })
                break;
            case 'plans':
                plans.push({
                    blh: blh,
                    seeno: seeno,
                    wcheck:ele.text,
                    p1: ele.p1,
                    p2: ele.p2,
                    p3: ele.p3,
                    p4: ele.p4,
                    numb:ele.id,
                    hzplan:ele.text
                })
                break;
            case 'cures':
                break;
        }
    })
    
    
    console.log(array)
}