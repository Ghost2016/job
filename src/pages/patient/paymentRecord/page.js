if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'

const paymentItems = require('@/components/paymentItems/paymentItems.js')
$(function() {
  paymentItems.render('paymentItems', {})
})
