const ChartDetail = require('./chartDetail.ejs')
import './chartDetail.less'
import HighCharts from 'highcharts/highStock'
const exportModule = {}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  const tempObj = {
    // ...jsonObj
  }
  const ele = document.getElementById(id)
  ele.classList.add('_chart-detail')
  ele.innerHTML = ChartDetail(tempObj)
  // $('#chart-container').highcharts('StockChart', {

  // })
  /* eslint-disable */
  HighCharts.chart('chart-container',{
    chart: {
      type: 'areaspline',
      // panning: true, 
      // pinchType:'x',
      // minRange: 1,
      // zoomType: 'x'
    },
    title: {
        text: ''
    },
    subtitle: {
    },
    // scrollbar: {
    //   enabled: true,
    //   height: 5,
    //   barBackgroundColor: '#ff6722',
    //   barBorderRadius: 1,
    //   barBorderWidth: 0,
    //   buttonBackgroundColor: 'white',
    //   buttonBorderWidth: 0,
    //   buttonArrowColor: 'white',
    //   buttonBorderRadius: 0,
    //   rifleColor: '#ff6722',
    //   trackBackgroundColor: '#ffd9d9',
    //   trackBorderWidth: 1,
    //   trackBorderColor: '#ffd9d9',
    //   trackBorderRadius: 4
    // },
    xAxis: {
        // min: 0,
        // max: 10, // 显示4个
        // allowDecimals: false,
        // minRange: 1,
        labels: {
          formatter: function () {
            return this.value; // clean, unformatted number for year
          }
        },
    },
    yAxis: {
      tickWidth:0,//去掉刻度
      gridLineWidth: 0,//去掉y轴方向的横线
      labels: {
          enabled: false
      },//去掉刻度数字
      title: {
        text: '访问量'
      }
    },
    tooltip: {
        // pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
        pointFormat: '{series.name}<b>{point.y:,.0f}</b>'
    },
    plotOptions: {
        area: {
            pointStart: 1940,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: '美国',
        data: [22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
               10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
    }]
  });
  return exportModule
}
module.exports = exportModule

