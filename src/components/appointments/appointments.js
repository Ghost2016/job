const Appointments = require('./appointments.ejs')
import './appointments.less'

const exportModule = {}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  // console.log(jsonObj)
  jsonObj.map((item) => {
    if (item.isff === '已回访') {
      item.type = 4
    } else if (item.isff === '否') {
      item.type = 2
    } else if (item.state === '完成') {
      item.type = 0
    } else if (item.state === '爽约') {
      item.type = 3
    } else if (item.state === '预约') {
      item.type = 1
    }
    item.date = (item.bdate && item.bdate.substring(11, 16)) || (item.ffdate && item.ffdate.substring(11, 16))
  })
  const tempObj = { items: jsonObj }
  console.log(tempObj)
  const ele = document.getElementById(id)
  ele.classList.add('_patient-infos')
  ele.innerHTML = Appointments(tempObj)
  return exportModule
}
module.exports = exportModule

