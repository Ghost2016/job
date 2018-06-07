if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
const Native = require('@/lib/native.js')
import './page.less'

import { getMsgById } from '@/api/message'
const id = getSearchParam('id')
$(function() {
  loading()
  getMsgById(id).then(
    res => {
      loadingdone()
      fillUl(res.data.Data)
    }
  ).catch(
    e => {
      loadingdone()
    }
  )
  $('#template-list>ul').on('click', 'li>span', function(e) {
    // alert($(this).html())
    js.setBackWithValue($(this).html());
  })
})

function fillUl(msgTemplate) {
  var str=''
  for(var i=0;i<msgTemplate.length;i++){
    str += `<li>
      <span>${msgTemplate[i].messcontext}</span>
    </li>`
  }
  $('#template-list>ul').append(str)
}