// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
require('@/lib/common.js')
const Native = require('@/lib/native.js')
import './page.less'

$(function() {
  $('.income').on('click', function() {
    Native.startNextActivity({
      nexturl: HTML_BASE_URL_PREFIX + 'chartCenter/statistics/page.html?type=1', // eslint-disable-line
      nextparam: '',
      title: $(this).children('div').html(),
      flag: 1
    })
  })
    $('.pre-save').on('click', function() {
        Native.startNextActivity({
            nexturl: HTML_BASE_URL_PREFIX + 'chartCenter/statistics/page.html?type=2', // eslint-disable-line
            nextparam: '',
            title: $(this).children('div').html(),
            flag: 1
        })
    })
    $('.work-quantity').on('click', function() {
        Native.startNextActivity({
            nexturl: HTML_BASE_URL_PREFIX + 'chartCenter/statistics/page.html?type=3', // eslint-disable-line
            nextparam: '',
            title: $(this).children('div').html(),
            flag: 1
        })
    })
    $('.receive-patients').on('click', function() {
        Native.startNextActivity({
            nexturl: HTML_BASE_URL_PREFIX + 'chartCenter/statistics/page.html?type=4', // eslint-disable-line
            nextparam: '',
            title: $(this).children('div').html(),
            flag: 1
        })
    })
    $('.return-visit').on('click', function() {
        Native.startNextActivity({
            nexturl: HTML_BASE_URL_PREFIX + 'chartCenter/statistics/page.html?type=5', // eslint-disable-line
            nextparam: '',
            title: $(this).children('div').html(),
            flag: 1
        })
    })
    $('.out-work').on('click', function() {
        Native.startNextActivity({
            nexturl: HTML_BASE_URL_PREFIX + 'chartCenter/statistics/page.html?type=6', // eslint-disable-line
            nextparam: '',
            title: $(this).children('div').html(),
            flag: 1
        })
    })
})
