if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
import { fetchAnamnesisList } from '@/api/medicalRecordList'
import { getSearchParam } from '@/lib/utils'

const Native = require('@/lib/native.js')

const anamnesisItems = require('@/components/anamnesisItems/anamnesisItems.js')
let anamnesisListData = {}
let blh = getSearchParam('blh')||'32054077'

$(function() {
  getAnamnesisList({ blh: blh })
    $('#anamnesisItems').on('click','._anamnesis-item',function (e) {
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + 'patient/editAnamnesisRecord/page.html?blh=' + blh,
                nextparam: '',
                title: '编辑病历记录',
                flag:8,
            }
        )
    })
})

function getAnamnesisList(blh) {
    loading()
  fetchAnamnesisList(blh).then(
        res => {
            loadingdone()
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

window.funRightTouch =  function () {
    Native.startNextActivity(
        {
            nexturl: HTML_BASE_URL_PREFIX + 'patient/editAnamnesisRecord/page.html',
            nextparam: '',
            title: '新增病历信息',
            flag:1,
        }
    )
}