if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'

const anamnesisItems = require('@/components/anamnesisItems/anamnesisItems.js')
$(function() {
  anamnesisItems.render('anamnesisItems', {})
})
