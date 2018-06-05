require('@assets/less/common.less')
// require('@assets/fonts/iconfont.css')
require('./flexible.js')
import FastClick from 'fastclick'
require('./dialog')
require('@assets/css/dialog.css')

window.Native = require('@/lib/native')
window.getSearchParam = require('@/lib/utils').getSearchParam
window.$alert = window.alert
// import moment from 'moment'
// moment.locale('zh-cn');
$(function() {
  // FastClick.attach(document.body)
})

