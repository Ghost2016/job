const paymentItems = require('./paymentItems.ejs')
import './paymentItems.less'

const exportModule = {}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  const tempObj = {
    // ...jsonObj
  }
  const ele = document.getElementById(id)
  ele.classList.add('_payment-infos')
  ele.innerHTML = paymentItems(tempObj)
  return exportModule
}
module.exports = exportModule
