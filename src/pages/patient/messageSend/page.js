if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { getCommonMsg } from '@/api/message'


let phone = getSearchParam('phone')||'13888888888'

$(function() {
  loading()
  getCommonMsg().then(
    res => {
      loadingdone()
      fillUl(res.data.Data)
    }
  ).catch(
    e => {
      loadingdone()
    }
  )
  $('#templateUl').on('click', 'li>span', function() {
    const dataId = $(this).parent().attr('data-id')
    Native.startNextActivity(
      {
          nexturl: HTML_BASE_URL_PREFIX + 'patient/messageTemplateList/page.html?id='+dataId,
          nextparam: '',
          title: $(this).html(),
          flag:5,
      }
    )
  })
  $('#send').on('click', () => {
    // todo
      Native.sendSmgWithPhone(phone,$('#t-msg').val());
  })
})

function fillUl(msgTemplate) {
  var str = ''
  for(var i=0;i<msgTemplate.length;i++){
    str += `<li data-id="${msgTemplate[i].messupid}">
      <span>${msgTemplate[i].mestype}</span>
    </li>`
  }
  $('#templateUl').append(str)
}

window.funRightTouch = function() {
  Native.startNextActivity(
    {
        nexturl: HTML_BASE_URL_PREFIX + 'patient/differentTypeOfMessage/page.html',
        nextparam: '',
        title: '消息模板分类',
        flag:5,
    }
  )
}

window.funSelectCallBack = function(text) {
  $('textarea').val(text)
}