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
        list: [],
        extend:[],
        cz: (data.cz||0) + '人初诊',
        fz: (data.fz||0) + '人复诊'
      }
      switch (type) {
        case 1:
          innerData.title = `总收入：<b>${data.allsf || 0}元</b>`
          for(let i in data.list) {
            innerData.list.push(
              {
                key: data.list[i].sf_fs,
                value: (data.list[i].sf||0) + '元'
              }
            )
          }
          break;
        case 2:
          innerData.title = `当前预存款余额：<b>${data.syje || 0}元</b>`
            if('inje' in data){
                innerData.list.push(
                    {
                        key: '充值金额',
                        value: (data.inje) + '元'
                    }
                )
            }
          if('outje' in data){
              innerData.list.push(
                  {
                      key: '消费金额',
                      value: (data.outje) + '元'
                  }
              )
          }
          break;
        case 3:
            innerData.title = `总工作量：<b>${data.allje || 0}元</b>`
            for(let i in data.list) {
              if(data.list[i].name){
                  innerData.list.push(
                      {
                          key: data.list[i].name,
                          value: (data.list[i].sfje||0) + '元'
                      }
                  )
              }
            }
          break;
        case 4:
            innerData.title = `总计接诊：<b>${data.all || 0}人</b>`
            for(let i in data.list) {
                if(data.list[i].name){
                    innerData.list.push(
                        {
                            key: data.list[i].name,
                            value: '接诊' + ((data.list[i].cz + data.list[i].fz)||0) + '人'
                        }
                    )
                    innerData.extend.push(
                        {
                          cz: (data.list[i].cz||0) + '人初诊',
                          fz: (data.list[i].fz||0) + '人复诊'
                        }
                    )
                }
            }
          break;
        case 5:
            innerData.title = `总计回访：<b>${data.allhf || 0}次</b>`
            for(let i in data.list) {
                if(data.list[i].name){
                    innerData.list.push(
                        {
                            key: data.list[i].name,
                            value: '回访' + (data.list[i].hf||0) + '次'
                        }
                    )
                }
            }
          break;
        case 6:
            innerData.title = `总计外加工：<b>${data.allhf || 0}次</b>`
            for(let i in data.list) {
                if(data.list[i].name){
                    innerData.list.push(
                        {
                            key: data.list[i].name,
                            value: '外加工' + (data.list[i].jg||0) + '次'
                        }
                    )
                }
            }
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
