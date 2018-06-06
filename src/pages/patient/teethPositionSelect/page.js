if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'

$(function() {
  const topSet = new Set()
  const bottomSet = new Set()
  // console.log(map)
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
  
  $('.content span').on('click', function(){
    const index = $(this).html() - 0
    const set = (index >16)?bottomSet:topSet
    if($(this).hasClass('select')) {
      if(set.size === 15) {
        
      }
      $(this).removeClass('select')
      set.add(index)
      return
    } 
    if(set.size === 16) {
        
    }
    $(this).addClass('select')
    // map.set
  })
  $('.content-float-left').on('click', () => {
    // if(topSet.size === 16) {
    //   topSet.clear()
    //   $('.content-left-top>span').removeClass('select')
    //   $('.content-right-top>span').removeClass('select')
    //   return
    // }
    // let i = 1
    // while((i <= 16)) {
    //   topSet.add(i)
    //   i++
    // }
    $('.content-left-top>span').addClass('select')
    $('.content-right-top>span').addClass('select')
  })
  $('.content-float-right').on('click', () => {
    // if(bottomSet.size === 16) {
    //   bottomSet.clear()
    //   $('.content-left-bottom>span').removeClass('select')
    //   $('.content-right-bottom>span').removeClass('select')
    //   return
    // }
    // let i = 17
    // while((i <= 32)) {
    //   bottomSet.add(i)
    //   i++
    // }
    $('.content-left-bottom>span').addClass('select')
    $('.content-right-bottom>span').addClass('select')
  })
  $('.content-float-all').on('click', () => {
    // if((bottomSet.size === 16)&&(topSet.size === 16)) {
    //   bottomSet.clear()
    //   topSet.clear()
    //   $('.content-left-bottom>span').removeClass('select')
    //   $('.content-right-bottom>span').removeClass('select')
    //   $('.content-left-top>span').removeClass('select')
    //   $('.content-right-top>span').removeClass('select')
    //   return
    // }
    // let i = 1
    // while((i <= 16)) {
    //   topSet.add(i)
    //   i++
    // }
    // i = 17
    // while((i <= 32)) {
    //   bottomSet.add(i)
    //   i++
    // }
    $('.content-left-bottom>span').addClass('select')
    $('.content-right-bottom>span').addClass('select')
    $('.content-left-top>span').addClass('select')
    $('.content-right-top>span').addClass('select')
  })
})
