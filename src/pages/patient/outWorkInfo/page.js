if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchOutWorkList } from '@/api/outWorkInfo'
import { getSearchParam } from '@/lib/utils'

const outWorkItems = require('@/components/outWorkItems/outWorkItems.js')
let outWorkData = {}
let blh = getSearchParam('blh')||'22010018'

$(function() {
  getOutWorkList({ blh: blh })
})

function getOutWorkList(blh) {
    loading()
  fetchOutWorkList(blh).then(
        res => {
            loadingdone()
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
