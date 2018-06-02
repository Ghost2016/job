const Contacts = require('./contacts.ejs')
import './contacts.less'
const pinyin = require('pinyin')

function _transformContacts(data) {
  // data = ['梦琪', '忆柳', '之桃', '慕青', '问兰', '尔岚', '元香', '初夏', '沛菡', '傲珊', '曼文', '乐菱', '痴珊', '恨玉', '惜文', '香寒', '新柔', '语蓉', '海安', '夜蓉', '涵柏', '水桃', '醉蓝', '春儿', '语琴', '从彤', '傲晴', '语兰', '又菱', '碧彤', '元霜', '怜梦', '紫寒', '妙彤', '曼易', '南莲', '紫翠', '雨寒']
  // 排序
  const sortedData = data.sort((a, b) => {
    return ('' + pinyin(a.name, { style: pinyin.STYLE_FIRST_LETTER })).localeCompare('' + pinyin(b.name, { style: pinyin.STYLE_FIRST_LETTER }))
  })
  // console.log(pinyin('卞'))
  console.log(sortedData)
  // 提取字母
  const arr = {}
  sortedData.forEach(element => {
    // 提取字母
    const letter = (pinyin(element.name, {
      style: pinyin.STYLE_FIRST_LETTER // 设置拼音风格
    })[0] + '').toUpperCase()
    // 存入对象中
    if (!arr[letter]) {
      arr[letter] = [{
        pic: '',
        name: element.name,
        tel: element.tel || '暂无'
      }]
    } else {
      arr[letter].push({
        pic: '',
        name: element.name,
        tel: element.tel || '暂无'
      })
    }
  })
  return arr
}
/* eslint-disable */
const exportModule = {}
exportModule.render = function(id, { data }) {
  exportModule.id = id
  const tempObj = {
    contacts: _transformContacts(data)
  }
  const ele = document.getElementById(id)
  ele.classList.add('_contact')
  ele.innerHTML = Contacts(tempObj)

  var ic = [];
  var listgt = $(".zflist div").eq(0).height();
  $(".zflist div").each(
    function(r) {
      ic.push($(".zflist div").eq(r).offset().top - $(window).scrollTop())
    }
  )
  $(".zflist").on("touchstart", function(event) {
    ff(event)
    $(".biaoqian").show();
  })
  $(".zflist").on("touchend", function() {
    $("html, body").animate({
      scrollTop: $("._contact-list-header").eq(icae).offset().top + "px"
    }, {
      duration: 500,
      easing: "swing"
    });
    $(".biaoqian").hide();
    return false;
  })
  $(".zflist").on("touchmove", function(event) {
    event.preventDefault();
    ff(event)
  })
  function ff(event) {
    var dheight = event.changedTouches[0].clientY;
    $(ic).each(
      function(ri) {
        if(dheight < ic[0]) {
          overfun(0);
          return false;
        }
        if(dheight > ic[ic.length - 1]) {
          overfun(ic.length - 1);
          return false;
        }
        if(ic[ri] < dheight && dheight < ic[ri] + listgt) {
          overfun(ri);
          return false;
        }
      }
    )
  }
  var icae = 0;
  function overfun(aic) {
    icae = aic;
    $(".biaoqian").html($(".zflist div").eq(aic).html());
    $("html, body").stop(true);
    return false;
  }
  $('._contact-list-item').on('click', function(e) {
    alert($(this).children('div').children('div').children('span')[0].innerHTML)
  })
  return exportModule
}
module.exports = exportModule

