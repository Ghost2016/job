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
  id: getSearchParam('id') - 0
}
// const reg = /\d/;
const reg = /[ⅠⅡⅢⅣⅤ]/
let tab = reg.test(p.p1) || reg.test(p.p2) || reg.test(p.p3) || reg.test(p.p4)
// 当前选中的状态
tab = tab ? 1 : 0;
alert(tab)
$(function() {
  initTab()
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
    if(hasSelectedAll($('.content-left-top>span'))&&hasSelectedAll($('.content-right-top>span'))) {
      $('.content-left-top>span').removeClass('select')
      $('.content-right-top>span').removeClass('select')
      return
    }
    $('.content-left-top>span').addClass('select')
    $('.content-right-top>span').addClass('select')
  })
  $('.content-float-right').on('click', () => {
    if(hasSelectedAll($('.content-left-bottom>span'))&&hasSelectedAll($('.content-right-bottom>span'))) {
      $('.content-left-bottom>span').removeClass('select')
      $('.content-right-bottom>span').removeClass('select')
      return
    }
    $('.content-left-bottom>span').addClass('select')
    $('.content-right-bottom>span').addClass('select')
  })
  $('.content-float-all').on('click', () => {
    if(hasSelectedAll($('.content-left-bottom>span'))&&hasSelectedAll($('.content-right-bottom>span'))
    &&hasSelectedAll($('.content-left-top>span'))&&hasSelectedAll($('.content-right-top>span'))) {
      $('.content-left-bottom>span').removeClass('select')
      $('.content-right-bottom>span').removeClass('select')
      $('.content-left-top>span').removeClass('select')
      $('.content-right-top>span').removeClass('select')
      return
    }
    $('.content-left-bottom>span').addClass('select')
    $('.content-right-bottom>span').addClass('select')
    $('.content-left-top>span').addClass('select')
    $('.content-right-top>span').addClass('select')
  })
  // tab
  $('#tab>span').on('click', function(){
    tab = $(this).index()
    const index = tab;
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
    if(hasSelectedAll($('.deciduousTeech-left-top>span'))&&hasSelectedAll($('.deciduousTeech-right-top>span'))) {
      $('.deciduousTeech-left-top>span').removeClass('select')
      $('.deciduousTeech-right-top>span').removeClass('select')
      return
    }
    $('.deciduousTeech-left-top>span').addClass('select')
    $('.deciduousTeech-right-top>span').addClass('select')
  })
  $('.deciduousTeech-float-right').on('click', () => {
    if(hasSelectedAll($('.deciduousTeech-left-bottom>span'))&&hasSelectedAll($('.deciduousTeech-right-bottom>span'))) {
      $('.deciduousTeech-left-bottom>span').removeClass('select')
      $('.deciduousTeech-right-bottom>span').removeClass('select')
      return
    }
    $('.deciduousTeech-left-bottom>span').addClass('select')
    $('.deciduousTeech-right-bottom>span').addClass('select')
  })
  $('.deciduousTeech-float-all').on('click', () => {
    if(hasSelectedAll($('.deciduousTeech-left-bottom>span'))&&hasSelectedAll($('.deciduousTeech-right-bottom>span'))
    &&hasSelectedAll($('.deciduousTeech-left-top>span'))&&hasSelectedAll($('.deciduousTeech-right-top>span'))) {
      $('.deciduousTeech-left-bottom>span').removeClass('select')
      $('.deciduousTeech-right-bottom>span').removeClass('select')
      $('.deciduousTeech-left-top>span').removeClass('select')
      $('.deciduousTeech-right-top>span').removeClass('select')
      return
    }
    $('.deciduousTeech-left-bottom>span').addClass('select')
    $('.deciduousTeech-right-bottom>span').addClass('select')
    $('.deciduousTeech-left-top>span').addClass('select')
    $('.deciduousTeech-right-top>span').addClass('select')
  })

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
function hasSelectedAll($node) {
  // let $node = $('.deciduousTeech-left-top>span')
  return [].every.call($node, function(item){ return $(item).hasClass('select')})
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
  if(tab === 0) {
    p.p1 = getPos($('.content-left-top>span'))
    p.p2 = getPos($('.content-right-top>span'))
    p.p3 = getPos($('.content-left-bottom>span'))
    p.p4 = getPos($('.content-right-bottom>span'))
  } else {
    p.p1 = getPos($('.deciduousTeech-left-top>span'))
    p.p2 = getPos($('.deciduousTeech-right-top>span'))
    p.p3 = getPos($('.deciduousTeech-left-bottom>span'))
    p.p4 = getPos($('.deciduousTeech-right-bottom>span'))
  }
  // alert(JSON.stringify(p))
  window.js.setBackWithValue(JSON.stringify(p));  
  return
  setTimeout(() => {
    window.js.setBackWithValue(JSON.stringify(p));
  }, 400)
  
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
function initTab() {

  if(tab===1) {
    initDeciduousTeech()
    $('#tab>span:nth(1)').addClass('active').siblings('span').removeClass('active')
    $('.content').removeClass('show').siblings('div').addClass('show')
  } else{
    // 绑定状态
    initTooth()
  }
}