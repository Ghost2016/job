if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'

const topSet = new Set()
const bottomSet = new Set()
const toothItem = JSON.parse(localStorage.getItem('toothItem'))
var p = {
  p1: (toothItem && toothItem.p1) || '',
  p2: (toothItem && toothItem.p2) || '',
  p3: (toothItem && toothItem.p3) || '',
  p4: (toothItem && toothItem.p4) || '',
  id: getSearchParam('id')
}

// 当前选中的状态
var tab = 0;
$(function() {
  // console.log(map)
  const baseFontSize = $('html').css('fontSize')
  const _height = $('.content-left-top').css('height').slice(0, -2) - 0.6 * baseFontSize.slice(0, -2)
  const _width = $('.content-left-top').css('width').slice(0, -2) - 0.6 * baseFontSize.slice(0, -2)
  // 左上的图
  for (let i = 0; i <= 7; i++) {
    $($('.content-left-top > span')[i]).css('top', ((-Math.sin(Math.PI / 2 / 7 * i) + 1) * _height + 'px'))
    $($('.content-left-top > span')[i]).css('left', ((-Math.cos(Math.PI / 2 / 7 * i) + 1) * _width + 'px'))
  }
  // 右上的图
  for (let i = 0; i <= 7; i++) {
    console.log((-(Math.sin(Math.PI / 2 / 7 * i) + 1)))
    $($('.content-right-top > span')[i]).css('top', ((-Math.sin(Math.PI / 2 / 7 * (7 - i)) + 1) * _height + 'px'))
    $($('.content-right-top > span')[i]).css('left', ((Math.cos(Math.PI / 2 / 7 * (7 - i))) * _width + 'px'))
  }
  // 左下的图
  for (let i = 0; i <= 7; i++) {
    $($('.content-left-bottom > span')[i]).css('top', ((Math.sin(Math.PI / 2 / 7 * i)) * _height + 'px'))
    $($('.content-left-bottom > span')[i]).css('left', ((-Math.cos(Math.PI / 2 / 7 * i) + 1) * _width + 'px'))
  }
  // 右下的图
  for (let i = 0; i <= 7; i++) {
    $($('.content-right-bottom > span')[i]).css('top', ((Math.sin(Math.PI / 2 / 7 * (7 - i)) * _height + 'px')))
    $($('.content-right-bottom > span')[i]).css('left', ((Math.cos(Math.PI / 2 / 7 * (7 - i))) * _width + 'px'))
  }
  // 绑定状态
  initTooth()
  // 选
  $('.content').on('click','span', function(){
    // alert($(this).index())
    if($(this).hasClass('select')) {
      $(this).removeClass('select')
      return
    } 
    $(this).addClass('select')
  })
  $('.content-float-left').on('click', () => {
    $('.content-left-top>span').addClass('select')
    $('.content-right-top>span').addClass('select')
  })
  $('.content-float-right').on('click', () => {
    $('.content-left-bottom>span').addClass('select')
    $('.content-right-bottom>span').addClass('select')
  })
  $('.content-float-all').on('click', () => {
    $('.content-left-bottom>span').addClass('select')
    $('.content-right-bottom>span').addClass('select')
    $('.content-left-top>span').addClass('select')
    $('.content-right-top>span').addClass('select')
  })
  // tab
  $('#tab>span').on('click', function(){
    const index = $(this).index()
    if($(this).hasClass('active')){
      return
    } else {
      $(this).addClass('active').siblings('span').removeClass('active')
      if(index === 0) {
        $('.content').addClass('show').siblings('div').removeClass('show')
      } else {
        $('.content').removeClass('show').siblings('div').addClass('show')
      }
    }
  })
  // 乳牙
  // 左上的图
  for (let i = 0; i <= 4; i++) {
    $($('.deciduousTeech-left-top > span')[i]).css('top', ((-Math.sin(Math.PI / 2 / 4 * i) + 1) * _height + 'px'))
    $($('.deciduousTeech-left-top > span')[i]).css('left', ((-Math.cos(Math.PI / 2 / 4 * i) + 1) * _width + 'px'))
  }
  // 右上的图
  for (let i = 0; i <= 4; i++) {
    console.log((-(Math.sin(Math.PI / 2 / 7 * i) + 1)))
    $($('.deciduousTeech-right-top > span')[i]).css('top', ((-Math.sin(Math.PI / 2 / 4 * (4 - i)) + 1) * _height + 'px'))
    $($('.deciduousTeech-right-top > span')[i]).css('left', ((Math.cos(Math.PI / 2 / 4 * (4 - i))) * _width + 'px'))
  }
  // 左下的图
  for (let i = 0; i <= 4; i++) {
    $($('.deciduousTeech-left-bottom > span')[i]).css('top', ((Math.sin(Math.PI / 2 / 4 * i)) * _height + 'px'))
    $($('.deciduousTeech-left-bottom > span')[i]).css('left', ((-Math.cos(Math.PI / 2 / 4 * i) + 1) * _width + 'px'))
  }
  // 右下的图
  for (let i = 0; i <= 4; i++) {
    $($('.deciduousTeech-right-bottom > span')[i]).css('top', ((Math.sin(Math.PI / 2 / 4 * (4 - i)) * _height + 'px')))
    $($('.deciduousTeech-right-bottom > span')[i]).css('left', ((Math.cos(Math.PI / 2 / 4 * (4 - i))) * _width + 'px'))
  }
  // 选
  $('.deciduousTeech').on('click','span', function(){
    if($(this).hasClass('select')) {
      $(this).removeClass('select')
      return
    } 
    $(this).addClass('select')
  })
  $('.deciduousTeech-float-left').on('click', () => {
    $('.deciduousTeech-left-top>span').addClass('select')
    $('.deciduousTeech-right-top>span').addClass('select')
  })
  $('.deciduousTeech-float-right').on('click', () => {
    $('.deciduousTeech-left-bottom>span').addClass('select')
    $('.deciduousTeech-right-bottom>span').addClass('select')
  })
  $('.deciduousTeech-float-all').on('click', () => {
    $('.deciduousTeech-left-bottom>span').addClass('select')
    $('.deciduousTeech-right-bottom>span').addClass('select')
    $('.deciduousTeech-left-top>span').addClass('select')
    $('.deciduousTeech-right-top>span').addClass('select')
  })
  // 绑定状态
  initDeciduousTeech()
  $('#save').on('click', ()=>{
    _submit()
  })
})
// 通过node获取选中的位置
function getPos($parentNode) {
  let pos = ''
  $parentNode.each(function(i,e) {
    if($(e).hasClass('select')){
      pos += $(e).html()
    }
  })
  return pos
}
// 通过node获取选中的位置(针对乳牙用)
function getDeciduousPos($parentNode) {
  let pos = ''
  $parentNode.each(function(i,e) {
    if($(e).hasClass('select')){
      pos += `[${$(e).html()}]`
    }
  })
  return pos
}
window.funRightTouch = function(value) {
  _submit()
}
function _submit(){
  p.p1 = getPos($('.content-left-top>span'))
  p.p2 = getPos($('.content-right-top>span'))
  p.p3 = getPos($('.content-left-bottom>span'))
  p.p4 = getPos($('.content-right-bottom>span'))

  p.p1 += getPos($('.deciduousTeech-left-top>span'))
  p.p2 += getPos($('.deciduousTeech-right-top>span'))
  p.p3 += getPos($('.deciduousTeech-left-bottom>span'))
  p.p4 += getPos($('.deciduousTeech-right-bottom>span'))
  js.setBackWithValue(JSON.stringify(p));
}
// 添加状态
function addSelectStatus(pos, $parentNode) {
  $parentNode.each(function(i,e) {
    if(pos.indexOf($(e).html()) > -1) {
      $(e).addClass('select')
    }
  })
}
// 添加状态(乳牙)
function deciduousAddSelectStatus(pos, $parentNode) {
  $parentNode.each(function(i,e) {
    if(pos.indexOf(`[${$(e).html()}]`) > -1) {
      $(e).addClass('select')
    }
  })
}
// 初始化
function initTooth() {
  addSelectStatus(p.p1, $('.content-left-top>span'))
  addSelectStatus(p.p2, $('.content-right-top>span'))
  addSelectStatus(p.p3, $('.content-left-bottom>span'))
  addSelectStatus(p.p4, $('.content-right-bottom>span'))
}
// 初始化
function initDeciduousTeech(){
  addSelectStatus(p.p1, $('.deciduousTeech-left-top>span'))
  addSelectStatus(p.p2, $('.deciduousTeech-right-top>span'))
  addSelectStatus(p.p3, $('.deciduousTeech-left-bottom>span'))
  addSelectStatus(p.p4, $('.deciduousTeech-right-bottom>span'))
}