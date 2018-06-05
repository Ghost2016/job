if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
const Native = require('@/lib/native.js')

$(function() {
    $('#turn-to-teeth').on('click',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/teethPositionSelect/page.html',
                nextparam: '',
                title: '牙位检查',
                flag:1,
            }
        )
    })
})
