const statisticsDetail = require('./statisticsDetail.ejs')
import './statisticsDetail.less'

const exportModule = {}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  const tempObj = {
    type: jsonObj.type || 'income'
  }
  const ele = document.getElementById(id)
  ele.classList.add('_statistics-detail')
  ele.innerHTML = statisticsDetail(tempObj)
  return exportModule
}
module.exports = exportModule
