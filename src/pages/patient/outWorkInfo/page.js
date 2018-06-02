if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'

const outWorkItems = require('@/components/outWorkItems/outWorkItems.js')
$(function() {
  outWorkItems.render('outWorkItems', {})
})
