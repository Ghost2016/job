const Contacts = require('./contacts.ejs')
import './contacts.less'
const pinyin = require('pinyin')
// 优化点
// JSON.stringify(pySegSort(["我","不","懂","爱","啊","按","已","呀","选","县"]))
// //结果
// "[
// 　　{"letter":"a","data":["啊","爱","按"]},
// 　　{"letter":"b","data":["不"]},
// 　　{"letter":"d","data":["懂"]},
// 　　{"letter":"w","data":["我"]},
// 　　{"letter":"x","data":["县","选"]},
// 　　{"letter":"y","data":["呀","已"]}
// ]"
function pySegSort(arr, empty) {
  if (!String.prototype.localeCompare) { return null }

  var letters = '*abcdefghjklmnopqrstwxyz'.split('')
  var zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('')

  var segs = []
  var curr
  $.each(letters, function(i) {
    curr = { letter: this, data: [] }
    $.each(arr, function() {
      if ((!zh[i - 1] || zh[i - 1].localeCompare(this, 'zh') <= 0) && this.localeCompare(zh[i], 'zh') == -1) {
        curr.data.push(this)
      }
    })
    if (empty || curr.data.length) {
      segs.push(curr)
      curr.data.sort(function(a, b) {
        return a.localeCompare(b, 'zh')
      })
    }
  })
  return segs
}

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
  var a = {
    B: [
      {
        pic: '',
        name: '',
        tel: ''
      }
    ],
    C: []
  }
  return arr
}
/* eslint-disable */
const exportModule = {}
exportModule.render = function(id, { data }) {
  exportModule.id = id
  const tempObj = {
    contacts: _transformContacts(data)
  }
  console.log(tempObj.contacts)
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

