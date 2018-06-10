if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchDoctorList } from '@/api/common'
import { addAnamnesis, getAnamnesis, editAnamnesis, deleteAnamnesis } from '@/api/anamnesis'

const isAdd = !getSearchParam('isEdit')
// 前一个页面传递病历号
var blh = getSearchParam('blh') || 32030515
var seeno = getSearchParam('seeno') || 0
var name = getSearchParam('name') || ''
// 操作员
var operater = 5
// 口腔检查集合，有0-n条记录
var checks = []
// 辅助检查（X光）
var others = []
// 诊断记录
var diagnoses = []
// 治疗计划
var plans = []
// 治疗过程
var cures = []

var doctorListSelector = null
$(function() {
  if(!isAdd) {
    loading()
    getAnamnesis({blh:blh,seeno:seeno}).then(
      res => {
        loadingdone()
        console.log(res)
        fillData(res.data.Data)
      }
    ).catch(
      e => {
        loadingdone()
        console.log(e)
      }
    )
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
      console.log('口腔检查')
      localStorage.setItem('checkItems', JSON.stringify(checks))
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + `patient/checkAndEdit/page.html?type=checks&isEdit=${!isAdd}`,
                nextparam:'',
                title: '检查编辑',
                flag:5,
            }
        )
    })
    $('#turn-to-auxiliary').on('click',function (e) {
      console.log('辅助检查（X光）')
      localStorage.setItem('checkItems', JSON.stringify(others))
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + `patient/checkAndEdit/page.html?type=others&isEdit=${!isAdd}`,
                nextparam: '',
                title: '检查编辑',
                flag:5,
            }
        )
    })
    $('#turn-to-diagnose').on('click',function (e) {
      console.log('诊断记录')
      localStorage.setItem('checkItems', JSON.stringify(diagnoses))
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + `patient/checkAndEdit/page.html?type=diagnoses&isEdit=${!isAdd}`,
                nextparam: '',
                title: '检查编辑',
                flag:5,
            }
        )
    })
    $('#turn-to-treat').on('click',function (e) {
      console.log('治疗计划')
      localStorage.setItem('checkItems', JSON.stringify(plans))
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + `patient/checkAndEdit/page.html?type=plans&isEdit=${!isAdd}`,
                nextparam: '',
                title: '检查编辑',
                flag:5,
            }
        )
    })
    $('#turn-to-cures').on('click',function (e) {
      console.log('治疗计划')
      localStorage.setItem('checkItems', JSON.stringify(cures))
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + `patient/checkAndEdit/page.html?type=cures&isEdit=${!isAdd}`,
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
        if(isAdd) {
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
                console.log(e)
            }
          )
        } else {
          form.seeno = seeno
          editAnamnesis(form).then(
            res => {
              loadingdone()
              if( res.data.Data ) {
                  console.log('编辑成功')
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
    // alert('delete')
    let form = {
      blh:blh,
      seeno: seeno
    }
    loading()
    deleteAnamnesis(form).then(
      res => {
        loadingdone()
        if( res.data.Data ) {
            console.log('删除成功')
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

window.funSelectCallBack = function(jsonString) {
    // alert(jsonString)
    var { array, type } = JSON.parse(jsonString)
    // 清空数据
    switch(type) {
      case 'checks':
          checks=[]
          break;
      case 'others':
          others=[]
          break;
      case 'diagnoses':
          diagnoses=[]
          break;
      case 'plans':
          plans=[]
          break;
      case 'cures':
          cures=[]
          break;
  }
    array.forEach((ele,index) => {
        let tempObj = {
            
        }
        switch(type) {
            case 'checks':
                checks.push({
                    blh: blh,
                    seeno: seeno,
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
                    p1: ele.p1,
                    p2: ele.p2,
                    p3: ele.p3,
                    p4: ele.p4,
                    numb:ele.id,
                    hzplan:ele.text
                })
                break;
            case 'cures':
                cures.push({
                  blh: blh,
                  seeno: seeno,
                  cure:ele.text,
                  p1: ele.p1,
                  p2: ele.p2,
                  p3: ele.p3,
                  p4: ele.p4,
                  numb:ele.id,
                  hzplan:ele.text
                })
                break;
        }
    })
    console.log(array)
}
function fillData(dataSet) {
  const data = dataSet.main[0]
  if(!data){$alert('请求失败');return}
  $('#date').val(data.seedate)
  // 初诊复诊
  $('.checkbox-radio-label-box').each(function(index,element){
    if($(element).attr('data-type') === data.czfz) {
      $(element).addClass('is-checked')
    } else {
      $(element).removeClass('is-checked')
    }
  })
  $('#doctor-name').val(data.doctor)
  $('#narrate').val(data.narrate)
  $('#ext1').val(data.ext1)
  $('#history').val(data.history)
  name = data.name
  operater = data.operater
  $('#advice').html(data.advice)
  $('#doctor-name').html(data.docname)
  $('#doctor-name').val(data.doctor)
  checks = dataSet.checks
  others = dataSet.others
  diagnoses = dataSet.diagnoses
  plans = dataSet.plans
  cures = dataSet.cures
}