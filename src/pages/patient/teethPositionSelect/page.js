if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'

$(function() {
  const baseFontSize = $('html').css('fontSize')
  const _height = $('.content-left-top').css('height').slice(0, -2) - 0.6 * baseFontSize.slice(0, -2)
  const _width = $('.content-left-top').css('width').slice(0, -2) - 0.6 * baseFontSize.slice(0, -2)
  // 左上的图
  // $($('.content-left-top > span')[0]).css('top', ((Math.sin(0) + 1) * _height + 'px'))
  // $($('.content-left-top > span')[0]).css('left', ((Math.sin(0)) * _width + 'px'))
  for (let i = 0; i <= 7; i++) {
    $($('.content-left-top > span')[i]).css('top', ((-Math.sin(Math.PI / 2 / 7 * i) + 1) * _height + 'px'))
    $($('.content-left-top > span')[i]).css('left', ((-Math.cos(Math.PI / 2 / 7 * i) + 1) * _width + 'px'))
  }
  // 右上的图
  // $($('.content-right-top > span')[0]).css('top', ((Math.sin(0)) * _height + 'px'))
  // $($('.content-right-top > span')[0]).css('left', ((Math.sin(0)) * _width + 'px'))
  for (let i = 0; i <= 7; i++) {
    console.log((-(Math.sin(Math.PI / 2 / 7 * i) + 1)))
    $($('.content-right-top > span')[i]).css('top', ((-Math.sin(Math.PI / 2 / 7 * (7 - i)) + 1) * _height + 'px'))
    $($('.content-right-top > span')[i]).css('left', ((Math.cos(Math.PI / 2 / 7 * (7 - i))) * _width + 'px'))
  }
  // 左下的图
  // $($('.content-left-bottom > span')[0]).css('top', ((Math.sin(0)) * _height + 'px'))
  // $($('.content-left-bottom > span')[0]).css('left', ((Math.sin(0)) * _width + 'px'))
  for (let i = 0; i <= 7; i++) {
    $($('.content-left-bottom > span')[i]).css('top', ((Math.sin(Math.PI / 2 / 7 * i)) * _height + 'px'))
    $($('.content-left-bottom > span')[i]).css('left', ((-Math.cos(Math.PI / 2 / 7 * i) + 1) * _width + 'px'))
  }
  // 右下的图
  // $($('.content-right-bottom > span')[0]).css('top', ((Math.sin(0) + 1) * _height + 'px'))
  // $($('.content-right-bottom > span')[0]).css('left', ((Math.sin(0)) * _width + 'px'))
  for (let i = 0; i <= 7; i++) {
    $($('.content-right-bottom > span')[i]).css('top', ((Math.sin(Math.PI / 2 / 7 * (7 - i)) * _height + 'px')))
    $($('.content-right-bottom > span')[i]).css('left', ((Math.cos(Math.PI / 2 / 7 * (7 - i))) * _width + 'px'))
  }
})
