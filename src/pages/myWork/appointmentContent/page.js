import './page.less'
require('@/lib/common.js')

import { fetchReturnVisitContent, fetchAppointmentContent } from '@/api/common'

import { getSearchParam } from '@/lib/utils'
// 是否是预约
const isAppointment = getSearchParam('isAppointment') || false

$(function(){
  if(isAppointment) {
    fetchAppointmentContent().then(
      res => {
        console.log(res)
        const data = res.data.Data
        var str = ''
        for (let i in data) {
          str += `<p class="item-p"><label class="checkbox-radio-label" for="radio-${i}">
            <span class="checkbox-radio-label-box" data-text="${data[i].name}">
              <input class="checkbox-radio-label-input" type="radio" name="content" id="radio-${i}">
            </span>
            <b class="checkbox-radio-label-content">${data[i].name}</b>
          </label></p>`
        }
        $('#form').append(str)
        // 切换
        $('#form').on('click','.item-p>label', function(e) {
          $(this).children('span').addClass('is-checked')
          $(this).parent().siblings('.item-p').children('label').children('span').removeClass('is-checked')
        })
      }
    ).catch(
      e => {
        console.log(e)
      }
    )
  } else {
    fetchAppointmentContent().then(
      res => {
        console.log(res)
        const data = res.data.Data
        var str = ''
        for (let i in data) {
          str += `<p class="item-p"><label class="checkbox-radio-label" for="radio-${i}">
            <span class="checkbox-radio-label-box" data-text="${data[i].name}">
              <input class="checkbox-radio-label-input" type="radio" name="content" id="radio-${i}">
            </span>
            <b class="checkbox-radio-label-content">${data[i].name}</b>
          </label></p>`
        }
        $('#form').append(str)
        // 切换
        $('#form').on('click','.item-p>label', function(e) {
          $(this).children('span').addClass('is-checked')
          $(this).parent().siblings('.item-p').children('label').children('span').removeClass('is-checked')
        })
      }
    ).catch(
      e => {
        console.log(e)
      }
    )
  }
  $('.save').on('click', () => {
    // console.log()
    window.js.setBackWithValue($('#input').val() || $('.item-p .is-checked').attr('data-text'));
  })
})
