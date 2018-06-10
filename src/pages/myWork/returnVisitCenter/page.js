// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
import './page.less'
require('@/lib/common.js')
import { fetchReturnVisitList } from '@/api/returnVisit'
const Appointments = require('@/components/appointments/appointments.js')
import { Timer } from '@/lib/utils.js'

const Native = require('@/lib/native.js')

$(function() {
  var timer = new Timer({
    LeftArrowId: 'left-arrow',
    RightArrowId: 'right-arrow',
    TextId: 'timer-text',
    regFormat: 'YYYY年MM月DD日应回访',
    onAdd: function(date) {
      fetchData(date)
    },
    onMinus: function(date) {
      fetchData(date)
    },
    onChange: function(date) {
      fetchData(date)
    }
  })
  $('#appointment-time').on('click', function() {
    timer.show()
  })
  fetchData(timer.getParsedTime())
    $('#appointments').on('click','.appointment-item',function () {
        var that = this
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'myWork/newReturnVisit/page.html?isEdit=1&sid=' + that.dataset.sid,
                nextparam: '',
                title: '编辑回访',
                flag:8,
            }
        )
    })
    $('#appointments').on('click','.appointment-item-right-tel',function (e) {
        e.stopPropagation()
        window.js.invokeCall(e.target.dataset.tel)
    })
})

// 获取数据
function fetchData(date) {
  loading()
  fetchReturnVisitList({ today: date }).then(
    res => {
      loadingdone()
      const data = res.data.Data
      console.log(data)
      updateReturnVisit(data)
    }
  ).catch(
    e => {
      loadingdone()
      console.log(e)
    }
  )
}
// 更新回访条目
function updateReturnVisit(data) {
  Appointments.render('appointments', data)
}

window.funRightTouch =  function () {
    Native.startNextActivity(
        {
            nexturl: HTML_BASE_URL_PREFIX + 'myWork/newReturnVisit/page.html',
            nextparam: '',
            title: '新增回访',
            flag:1,
        }
    )
}

