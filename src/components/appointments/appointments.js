const Appointments = require('./appointments.ejs')
import './appointments.less'

const exportModule = {}
exportModule.render = function(id, jsonObj, isSingle) {
  exportModule.id = id
  console.log(jsonObj)
  jsonObj.map((item) => {
    if (item.isff === '已回访') {
      item.type = 4
    } else if ((item.isff === '否')||(item.isff === '未访')) {
      item.type = 2
    } else if (item.state === '完成') {
      item.type = 0
    } else if (item.state === '爽约') {
      item.type = 3
    } else if (item.state === '预约') {
      item.type = 1
    }
    item.date = (item.bdate && item.bdate.substring(11, 16)) || (item.ffdate && item.ffdate.substring(11, 16))
    item.date1 = (item.bdate && (item.bdate.substring(0, 4) + '/' + item.bdate.substring(5, 7) + '/' + item.bdate.substring(8, 10))) || (item.ffdate.substring(0, 4) + '/' + item.ffdate.substring(5, 7) + '/' + item.ffdate.substring(8, 10))
  })
  const tempObj = { items: jsonObj, isSingle: isSingle }
  console.log(tempObj)
  const ele = document.getElementById(id)
  ele.classList.add('_patient-infos')
  ele.innerHTML = Appointments(tempObj)
  $('.appointment-item').on('click', function() {
    let selectedItem = jsonObj.filter( (item) => {
      return item.no === $(this).attr('data-no') - 0
    })
    isSingle.onItemClick && isSingle.onItemClick(selectedItem[0])
  })
  
  return exportModule
}
module.exports = exportModule

