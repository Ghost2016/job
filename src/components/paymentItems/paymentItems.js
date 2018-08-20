const paymentItems = require('./paymentItems.ejs')
import './paymentItems.less'
const moment = require('moment')

const exportModule = {}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  const tempObj = { items: jsonObj.data.Data.list.map(item => Object.assign({}, item, {sfdate: moment(item.sfdate).format('YYYY-MM-DD hh:mm')}))}
  const ele = document.getElementById(id)
  ele.classList.add('_payment-infos')
  ele.innerHTML = paymentItems(tempObj)
  return exportModule
}
module.exports = exportModule
