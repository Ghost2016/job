const anamnesisItems = require('./anamnesisItems.ejs')
import './anamnesisItems.less'

const exportModule = {}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  const tempObj = {
    // ...jsonObj
  }
  const ele = document.getElementById(id)
  ele.classList.add('_anamnesis-items')
  ele.innerHTML = anamnesisItems(tempObj)
  return exportModule
}
module.exports = exportModule
