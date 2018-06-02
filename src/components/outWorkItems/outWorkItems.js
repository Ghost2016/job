const outWorkItems = require('./outWorkItems.ejs')
import './outWorkItems.less'

const exportModule = {}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  const tempObj = {
    // ...jsonObj
  }
  const ele = document.getElementById(id)
  ele.classList.add('_out-work-items')
  ele.innerHTML = outWorkItems(tempObj)
  return exportModule
}
module.exports = exportModule
