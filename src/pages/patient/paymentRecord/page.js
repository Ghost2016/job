if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchChargeList } from '@/api/chargeList'
import { getSearchParam } from '@/lib/utils'

const paymentItems = require('@/components/paymentItems/paymentItems.js')

let chargeListData = {}
let blh = getSearchParam('blh')||'32054077'

$(function() {
  getChargeList({ blh: blh })
})

function getChargeList(blh) {
    loading()
  fetchChargeList(blh).then(
        res => {
            loadingdone()
          chargeListData = res
          updateData(chargeListData)
          if ('list' in chargeListData.data.Data) {
            paymentItems.render('paymentItems', chargeListData)
          }
        }
    ).catch(
        e => {
          console.log(e)
        }
    )
}

function updateData(data) {
  if ('Data' in data.data) {
    $('#allss').text(data.data.Data.allss || '0.00')
    $('#czk').text(data.data.Data.czk || '0.00')
    $('#czk1').text(data.data.Data.czk || '0.00')
  }
}
