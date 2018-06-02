if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchAnamnesisList } from '@/api/medicalRecordList'

const anamnesisItems = require('@/components/anamnesisItems/anamnesisItems.js')
let anamnesisListData = {}

$(function() {
  getAnamnesisList({ blh: '32054077' })
})

function getAnamnesisList(blh) {
  fetchAnamnesisList(blh).then(
        res => {
          anamnesisListData = res
          if ('Data' in anamnesisListData.data) {
            anamnesisItems.render('anamnesisItems', anamnesisListData)
          }
        }
    ).catch(
        e => {
          console.log(e)
        }
    )
}
