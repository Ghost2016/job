if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { getMsgKind } from '@/api/message'

$(function() {
  loading()
  getMsgKind().then(
    res => {
      loadingdone()
      fillUl(res.data.Data)
    }
  ).catch(
    e => {
      loadingdone()
    }
  )
  $('#left-content>ul').on('click', 'li', function(e) {
    $(this).addClass('active').siblings('li').removeClass('active')
  })
  $('#right-content>ul').on('click', 'li', function(e) {
    const id = $(this).attr('data-id')
    Native.startNextActivity({
      nexturl: HTML_BASE_URL_PREFIX + 'patient/messageTemplateList/page.html?id=' + id, // eslint-disable-line
      nextparam: '',
      title: $(this).html(),
      flag: 5
    })
  })
})

function fillUl(msgTemplate) {
  var str=''
  for(var i=0;i<msgTemplate.length;i++){
    str += `<li data-id="${msgTemplate[i].messupid}">
      ${msgTemplate[i].Column1}
    </li>`
  }
  $('#right-content>ul').append(str)
}

window.funSelectCallBack = function(text) {
  winodw.js.setBackWithValue(text);
}