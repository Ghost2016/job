if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
const Native = require('@/lib/native.js')
import './page.less'

$(function() {
  $('#template-list>ul').on('click', 'li', function(e) {
    Native.startNextActivity({
      nexturl: HTML_BASE_URL_PREFIX + 'patient/messageSend/page.html', // eslint-disable-line
      nextparam: '',
      title: '消息发送',
      flag: 1
    })
  })
})
