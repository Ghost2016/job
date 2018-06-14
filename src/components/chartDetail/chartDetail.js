const ChartDetail = require('./chartDetail.ejs')
import './chartDetail.less'
import HighCharts from 'highcharts/highStock'
const exportModule = {}
exportModule.render = function(id, jsonObj, type) {
  exportModule.id = id
  const tempObj = {obj: jsonObj,type:type}
  // const tempObj = {
  //   // ...jsonObj
  // }
  /* const tempObj = [
    {
      'd': '2017-12-01 00:00:00',
      'xhz': 21,
      'fz': 36,
      'zg': 57
    },
    {
      'd': '2017-12-02 00:00:00',
      'xhz': 25,
      'fz': 54,
      'zg': 79
    },
    {
      'd': '2017-12-03 00:00:00',
      'xhz': 38,
      'fz': 49,
      'zg': 87
    },
    {
      'd': '2017-12-04 00:00:00',
      'xhz': 14,
      'fz': 39,
      'zg': 53
    },
    {
      'd': '2017-12-05 00:00:00',
      'xhz': 17,
      'fz': 33,
      'zg': 50
    },
    {
      'd': '2017-12-06 00:00:00',
      'xhz': 12,
      'fz': 42,
      'zg': 54
    },
    {
      'd': '2017-12-07 00:00:00',
      'xhz': 9,
      'fz': 14,
      'zg': 23
    },
    {
      'd': '2017-12-08 00:00:00',
      'xhz': 17,
      'fz': 44,
      'zg': 61
    },
    {
      'd': '2017-12-09 00:00:00',
      'xhz': 31,
      'fz': 54,
      'zg': 85
    },
    {
      'd': '2017-12-10 00:00:00',
      'xhz': 35,
      'fz': 49,
      'zg': 84
    },
    {
      'd': '2017-12-11 00:00:00',
      'xhz': 22,
      'fz': 56,
      'zg': 78
    },
    {
      'd': '2017-12-12 00:00:00',
      'xhz': 22,
      'fz': 36,
      'zg': 58
    },
    {
      'd': '2017-12-13 00:00:00',
      'xhz': 83,
      'fz': 49,
      'zg': 132
    },
    {
      'd': '2017-12-14 00:00:00',
      'xhz': 6,
      'fz': 18,
      'zg': 24
    },
    {
      'd': '2017-12-15 00:00:00',
      'xhz': 9,
      'fz': 35,
      'zg': 44
    },
    {
      'd': '2017-12-16 00:00:00',
      'xhz': 26,
      'fz': 39,
      'zg': 65
    },
    {
      'd': '2017-12-17 00:00:00',
      'xhz': 19,
      'fz': 54,
      'zg': 73
    },
    {
      'd': '2017-12-18 00:00:00',
      'xhz': 13,
      'fz': 58,
      'zg': 71
    },
    {
      'd': '2017-12-19 00:00:00',
      'xhz': 13,
      'fz': 53,
      'zg': 66
    },
    {
      'd': '2017-12-20 00:00:00',
      'xhz': 14,
      'fz': 26,
      'zg': 40
    },
    {
      'd': '2017-12-21 00:00:00',
      'xhz': 6,
      'fz': 7,
      'zg': 13
    },
    {
      'd': '2017-12-22 00:00:00',
      'xhz': 13,
      'fz': 27,
      'zg': 40
    },
    {
      'd': '2017-12-23 00:00:00',
      'xhz': 32,
      'fz': 50,
      'zg': 82
    },
    {
      'd': '2017-12-24 00:00:00',
      'xhz': 24,
      'fz': 60,
      'zg': 84
    },
    {
      'd': '2017-12-25 00:00:00',
      'xhz': 21,
      'fz': 54,
      'zg': 75
    },
    {
      'd': '2017-12-26 00:00:00',
      'xhz': 18,
      'fz': 54,
      'zg': 72
    },
    {
      'd': '2017-12-27 00:00:00',
      'xhz': 8,
      'fz': 46,
      'zg': 54
    },
    {
      'd': '2017-12-28 00:00:00',
      'xhz': 4,
      'fz': 6,
      'zg': 10
    },
    {
      'd': '2017-12-29 00:00:00',
      'xhz': 15,
      'fz': 40,
      'zg': 55
    },
    {
      'd': '2017-12-30 00:00:00',
      'xhz': 17,
      'fz': 70,
      'zg': 87
    },
    {
      'd': '2017-12-31 00:00:00',
      'xhz': 30,
      'fz': 50,
      'zg': 80
    }
  ]*/
  const ele = document.getElementById(id)
  ele.classList.add('_chart-detail')
  ele.innerHTML = ChartDetail(tempObj)
  // $('#chart-container').highcharts('StockChart', {

  // })

    // 获取平均值
  function avg(data) {
    var sum = 0
    for (var i = 0; i < data.length; i++) {
      sum += data[i]
    }
    return (sum / data.length).toFixed(0)
  }
  /* eslint-disable */
  if(type === 1) {
    var xdata = tempObj.obj.map(function (item) {
      return item.d.substring(8,10)
    })
    var ydata1 = tempObj.obj.map(function (item) {
          return item.xhz
    })
    var ydata2 = tempObj.obj.map(function (item) {
          return item.fz
    })
    var ydataAvg1 = avg(ydata1)
    var ydataAvg2 = avg(ydata2)
    console.log(xdata,ydata1,ydata2,ydataAvg1)

    HighCharts.chart('chart-container',{
      chart: {
        type: 'area',
        height: 200,
      },
      title: {
          text: ''
      },
        credits: {
            enabled: false
        },
      subtitle: {
      },
      xAxis: {
          // min: 0,
          // max: 10, // 显示4个
          gridLineStyle:'solid',
          gridLineColor:'#f1f1f1',
          gridLineWidth:1,
          tickLength:3,
          tickWidth:3,
          tickPosition:'inside',
          tickmarkPlacement: 'on',
          tickColor:'#f7a01c',
          categories:xdata,
          labels: {
            formatter: function () {
              return this.value; // clean, unformatted number for year
            },
              style:{
                color:'#f7a01c',
              }
          },
      },
      yAxis: {
        tickWidth:0,//去掉刻度
        gridLineWidth: 0,//去掉y轴方向的横线
        labels: {
            enabled: false,
        },//去掉刻度数字
        title: {
            enabled:false,
          // text: '访问量'
        },
        plotLines:[
            {
                color: '#1ECC6F',
                dashStyle:'dot',
                value: ydataAvg1,
                zIndex:5,
                width:2,
            },
            {
                color:'#FF52B7',
                dashStyle:'dot',
                value: ydataAvg2,
                zIndex:5,
                width:2,
            },
        ],
      },
      tooltip: {
          enabled:false,
          // pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
          pointFormat: '{series.name}<b>{point.y:,.0f}</b>'
      },
        legend:{
          enabled:false,
        },
      plotOptions: {
          area: {
              // dataLabels: {
              //     enabled: true,
              //     formatter: function() {
              //         return this.y;
              //     },
              // },
              lineWidth:1,
              // color:['#1ECC6F','#FF52B7'],
              // fillColor:'rgba(30,204,111,0.1)',
              // fillOpacity: 0.01,
              // pointStart: 1940,
              marker: {
                  enabled: true,
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
      series: [
      {
          // name: '美国',
          data: ydata1,
          color: '#1ECC6F',
          fillColor:'rgba(30,204,111,0.05)',
          dataLabels: {
              enabled: true,
              color:'#1ECC6F',
              allowOverlap: true,
              style:{
                  textOutline: "",
                  fontSize: '8px',
                  fontWeight:'',
              },
              formatter: function() {
                  return this.y;
              },
          },
      },
      {
        data: ydata2,
        color:'#FF52B7',
        fillColor:'rgba(255,82,183,0.05)',
        dataLabels: {
            enabled: true,
            color:'#FF52B7',
            allowOverlap: true,
            style:{
                textOutline: "",
                fontSize: '8px',
                fontWeight:'',
            },
            formatter: function() {
                return this.y;
            },
        },
      }
      ]
    });
  } else if(type === 3) {
    var xdata = tempObj.obj.map(function (item) {
      return item.d.substring(8,10)
    })
    var ydata = tempObj.obj.map(function (item) {
          return item.ff
    })
    var ydataAvg = avg(ydata)
    console.log(xdata,ydata,ydataAvg)
    HighCharts.chart('chart-container',{
      chart: {
        type: 'area',
        height: 200,
      },
      title: {
          text: ''
      },
        credits: {
            enabled: false
        },
      subtitle: {
      },
      xAxis: {
          // min: 0,
          // max: 10, // 显示4个
          gridLineStyle:'solid',
          gridLineColor:'#f1f1f1',
          gridLineWidth:1,
          tickLength:3,
          tickWidth:3,
          tickPosition:'inside',
          tickmarkPlacement: 'on',
          tickColor:'#f7a01c',
          categories:xdata,
          labels: {
            formatter: function () {
              return this.value; // clean, unformatted number for year
            },
              style:{
                color:'#f7a01c',
              }
          },
      },
      yAxis: {
        tickWidth:0,//去掉刻度
        gridLineWidth: 0,//去掉y轴方向的横线
        labels: {
            enabled: false,
        },//去掉刻度数字
        title: {
            enabled:false,
          // text: '访问量'
        },
        plotLines:[
            {
                color: '#8d23e6',
                dashStyle:'dot',
                value: ydataAvg,
                zIndex:5,
                width:2,
            }
        ],
      },
      tooltip: {
          enabled:false,
          pointFormat: '{series.name}<b>{point.y:,.0f}</b>'
      },
        legend:{
          enabled:false,
        },
      plotOptions: {
          area: {
              lineWidth:1,
              marker: {
                  enabled: true,
                  symbol: 'circle',
                  fillColor: '#FFFFFF',
                  lineColor: '#8d23e6',
                  lineWidth: 3,
                  radius: 3,
                  states: {
                      hover: {
                          enabled: true
                      }
                  }
              }
          }
      },
      series: [
      {
          data: ydata,
          color: 'rgba(141,35,230,0.8)',
          fillColor:'rgba(141,35,230,0.1)',
          lineWidth:3,
          dataLabels: {
              enabled: true,
              color:'#8d23e6',
              allowOverlap: true,
              style:{
                  textOutline: "",
                  fontSize: '8px',
                  fontWeight:'',
              },
              formatter: function() {
                  return this.y;
              },
          },
      }]
    });
  } else if (type === 2) {
    var xdata = tempObj.obj.map(function (item) {
      return item.d.substring(8,10)
    })
    var ydata = tempObj.obj.map(function (item) {
          return item.sf || 0
    })
    var ydataAvg = avg(ydata)
    console.log(xdata,ydata,ydataAvg)
    HighCharts.chart('chart-container',{
      chart: {
        type: 'area',
        height: 200,
      },
      title: {
          text: ''
      },
        credits: {
            enabled: false
        },
      subtitle: {
      },
      xAxis: {
          // min: 0,
          // max: 10, // 显示4个
          gridLineStyle:'solid',
          gridLineColor:'#f1f1f1',
          gridLineWidth:1,
          tickLength:3,
          tickWidth:3,
          tickPosition:'inside',
          tickmarkPlacement: 'on',
          tickColor:'#f7a01c',
          categories:xdata,
          labels: {
            formatter: function () {
              return this.value; // clean, unformatted number for year
            },
              style:{
                color:'#f7a01c',
              }
          },
      },
      yAxis: {
        tickWidth:0,//去掉刻度
        gridLineWidth: 0,//去掉y轴方向的横线
        labels: {
            enabled: false,
        },//去掉刻度数字
        title: {
            enabled:false,
          // text: '访问量'
        },
        plotLines:[
            {
                // color: '#1ECC6F',
                color:'#2979F7',
                dashStyle:'dot',
                value: ydataAvg,
                zIndex:5,
                width:2,
            }
        ],
      },
      tooltip: {
          enabled:false,
          pointFormat: '{series.name}<b>{point.y:,.0f}</b>'
      },
        legend:{
          enabled:false,
        },
      plotOptions: {
          area: {
              lineWidth:1,
              marker: {
                  enabled: true,
                  symbol: 'circle',
                  fillColor: '#FFFFFF',
                  lineColor: '#2979F7',
                  lineWidth: 3,
                  radius: 3,
                  states: {
                      hover: {
                          enabled: true
                      }
                  }
              }
          }
      },
      series: [
      {
          data: ydata,
          color: '#2979F7',
          // fillColor:'rgb(102,43,100,0.05)',
          lineWidth:3,
          fillColor:'rgba(41,121,247,0.1)',
          dataLabels: {
              enabled: true,
              // color:'#1ECC6F',
              color: '#2979F7',
              allowOverlap: true,
              style:{
                  y:12,
                  textOutline: "",
                  fontSize: '12px',
                  fontWeight:'',
              },
              formatter: function() {
                  return this.y;
              },
          },
      }]
    });
  }
  return exportModule
}
module.exports = exportModule



