const chartBrief = require('./chartBrief.ejs')
import './chartBrief.less'

const exportModule = {}
exportModule.render = function(id, jsonObj, type) {
  exportModule.id = id
  const tempObj = {
    data: jsonObj,
    type: type
  }
  const ele = document.getElementById(id)
  ele.classList.add('_chart-brief')
  ele.innerHTML = chartBrief(tempObj)
  return exportModule
}
module.exports = exportModule

