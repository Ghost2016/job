if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
const Native = require('@/lib/native.js')

$(function() {
  $('#left-content>ul').on('click', 'li', function(e) {
    $(this).addClass('active').siblings('li').removeClass('active')
  })
  $('#right-content>ul').on('click', 'li', function(e) {
    // const index = $(this).parent().index()
    Native.startNextActivity({
      nexturl: HTML_BASE_URL_PREFIX + 'patient/messageTemplateList/page.html', // eslint-disable-line
      nextparam: '',
      title: $(this).html(),
      flag: 1
    })
  })
})
