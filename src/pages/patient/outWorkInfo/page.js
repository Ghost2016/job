if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchOutWorkList } from '@/api/outWorkInfo'

const outWorkItems = require('@/components/outWorkItems/outWorkItems.js')
let outWorkData = {}

$(function() {
  getOutWorkList({ blh: '22010018' })
})

function getOutWorkList(blh) {
  fetchOutWorkList(blh).then(
        res => {
          outWorkData = res
          if ('Data' in outWorkData.data) {
            outWorkItems.render('outWorkItems', outWorkData)
          }
        }
    ).catch(
        e => {
          console.log(e)
        }
    )
}
