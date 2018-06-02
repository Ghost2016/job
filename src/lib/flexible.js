/* eslint-disable */
(function(win){
  var deviceWidth = document.documentElement.clientWidth,
  dpr = null, doc = document
  if (deviceWidth > 750) deviceWidth = 750
  doc.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
  if (!dpr) {
    var isAndroid = window.navigator.appVersion.match(/android/gi)
    var isIPhone = win.navigator.appVersion.match(/iphone/gi)
    var devicePixelRatio = win.devicePixelRatio
    if (isIPhone) {
              // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2
      } else {
        dpr = 1
      }
    } else {
              // 其他设备下，仍旧使用1倍的方案
      // dpr = 1
      dpr = devicePixelRatio
    }
  }
  doc.documentElement.setAttribute('data-dpr', dpr)
  // 设置body文字大小
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 0.3 + 'rem'
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      doc.body.style.fontSize = 0.3 + 'rem'
    }, false)
  }
})(window)

