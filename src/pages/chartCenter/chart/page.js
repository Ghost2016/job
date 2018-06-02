// 用以进行html热调试
if (APP_ENV!== 'production') { //eslint-disable-line
  require('./page.html')
}
require('@/lib/common.js')
import './page.less'

$(function() {
  // todo
  const ChartBrief = require('@/components/chartBrief/chartBrief')
  ChartBrief.render('chart-brief', {})
  const ChartDetail = require('@/components/chartDetail/chartDetail')
  ChartDetail.render('chart-detail', {})
})
