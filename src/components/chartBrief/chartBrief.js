const chartBrief = require('./chartBrief.ejs')
import './chartBrief.less'

const exportModule = {}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  const tempObj = {
    // ...jsonObj
  }
  const ele = document.getElementById(id)
  ele.classList.add('_chart-brief')
  ele.innerHTML = chartBrief(tempObj)
  return exportModule
}
module.exports = exportModule

