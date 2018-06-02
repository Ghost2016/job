// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
require('@/lib/common.js')
const Native = require('@/lib/native.js')
import './page.less'

$(function() {
  $('.content-wrapper>ul').on('click', 'li', function() {
    Native.startNextActivity({
      nexturl: HTML_BASE_URL_PREFIX + 'chartCenter/statistics/page.html', // eslint-disable-line
      nextparam: '',
      title: $(this).children('div').html(),
      flag: 1
    })
  })
})
