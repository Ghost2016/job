// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
require('@/lib/common.js')
import './page.less'
const timeSelector = require('@/components/timeSelector/timeSelector')

timeSelector.render('time-selector', {})

const type = 'income'
$(function() {
  const statisticsDetail = require('@/components/statisticsDetail/statisticsDetail')
  // todo
  if (type === 'income') {
    statisticsDetail.render('statistics-detail', {
      type: 'income'
    })
  }
})
