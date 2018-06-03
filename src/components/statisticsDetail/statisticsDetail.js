const statisticsDetail = require('./statisticsDetail.ejs')
import './statisticsDetail.less'

const exportModule = {}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  const tempObj = {
    type: jsonObj.type || 1,
    data: ((data, type) => {
      data = data || {}
      var innerData = {
        title: '',
        list: []
      }
      switch (type) {
        case 1:
          innerData.title = `总收入：<b>${data.allsf || 0}元</b>`
          for(let i in data.list) {
            innerData.list.push(
              {
                key: data.list[i].sf_fs + '元',
                value: data.list[i].sf
              }
            )
          }
          break;
        case 2:
          innerData.title = `当前预存款余额：<b>${data.syje || 0}元</b>`
          innerData.list.push(
            {
              key: '充值金额',
              value: data.inje + '元'
            }
          )
          innerData.list.push(
            {
              key: '消费金额',
              value: data.outje + '元'
            }
          )
          break;
        case 3:
          // url = 'Rpt/GZL'
          break;
        case 4:
          // url = 'Rpt/JZ'
          break;
        case 5:
          // url = 'Rpt/HF'
          break;
        case 6:
          // url = 'Rpt/WJG'
          break;
        default:
          break;
      }
      console.log(innerData)
      return innerData
    })(jsonObj.data, jsonObj.type)
  }
  const ele = document.getElementById(id)
  ele.classList.add('_statistics-detail')
  ele.innerHTML = statisticsDetail(tempObj)
  return exportModule
}
module.exports = exportModule
