const timeSelector = require('./timeSelector.ejs')
import './timeSelector.less'
const moment = require('moment')
// moment.locales()
moment.locale('zh-cn');
const exportModule = {
  timeSelector1: null,
  timeSelector2: null
}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  const tempObj = {
    isPreSave: (jsonObj.type === 2)
    // onLookup: jsonObj.onLookup
  }
  const ele = document.getElementById(id)
  ele.classList.add('_time-selector')
  ele.innerHTML = timeSelector(tempObj)
  // const
  if(!this.timeSelector1) {
    const now = new Date()
    const end = moment(now).format(`YYYY-MM-DD（星期dd）`)
    const start = moment(now).subtract(1,'day').format(`YYYY-MM-DD（星期dd）`)
    $('#_time-selector-content-item-start').val(start)
    $('#_time-selector-content-item-end').val(end)
    this.timeSelector1 = window.mobiscroll.date('#_time-selector-content-item-start', {
      dateFormat: `yy-mm-dd'（星期'D'）'`,
      lang: 'zh',
      defaultValue: start
    })
    this.timeSelector2 = window.mobiscroll.date('#_time-selector-content-item-end', {
      dateFormat: `yy-mm-dd'（星期'D'）'`,
      lang: 'zh',
      defaultValue: end
    })
  }
  $('._time-selector-search').on('click', () => {
   _callback(jsonObj.onLookup)
  })
  _callback(jsonObj.onLookup)
  return exportModule
}
function _callback(fn) {
  var Start = $('#_time-selector-content-item-start').val().substring(0,10)
  var End = $('#_time-selector-content-item-end').val().substring(0,10)
  fn && fn({Start,End})
}
exportModule.setPreSaveMoney = (val) => {
  $('#_pre-save-money>span').html(val)
}
module.exports = exportModule
