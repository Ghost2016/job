const timeSelector = require('./timeSelector.ejs')
import './timeSelector.less'

const exportModule = {}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  const tempObj = {
    // ...jsonObj
  }
  const ele = document.getElementById(id)
  ele.classList.add('_time-selector')
  ele.innerHTML = timeSelector(tempObj)
  window.mobiscroll.date('#_time-selector-content-item-start', {
    dateFormat: `yy-mm-dd'（星期'D'）'`,
    lang: 'zh'
  })
  window.mobiscroll.date('#_time-selector-content-item-end', {
    dateFormat: `yy-mm-dd'（星期'D'）'`,
    lang: 'zh'
  })
  return exportModule
}
module.exports = exportModule
