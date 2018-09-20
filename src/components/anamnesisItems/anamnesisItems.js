const anamnesisItems = require('./anamnesisItems.ejs')
import './anamnesisItems.less'

const exportModule = {}
exportModule.render = function(id, jsonObj) {
  // alert(JSON.stringify(jsonObj))
  exportModule.id = id
  const tempObj = { items: jsonObj.data.Data }
  const ele = document.getElementById(id)
  ele.classList.add('_anamnesis-items')
  ele.innerHTML = anamnesisItems(tempObj)
  return exportModule
}
module.exports = exportModule

