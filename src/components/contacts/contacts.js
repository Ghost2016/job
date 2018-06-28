const Contacts = require('./contacts.ejs')
import './contacts.less'
const pinyin = require('pinyin')
// 优化点
// console.log(JSON.stringify(pySegSort(["我","哇","不","懂","爱","啊","按","已","呀","选","县"])))
// //结果
// "[
// 　　{"letter":"a","data":["啊","爱","按"]},
// 　　{"letter":"b","data":["不"]},
// 　　{"letter":"d","data":["懂"]},
// 　　{"letter":"w","data":["我"]},
// 　　{"letter":"x","data":["县","选"]},
// 　　{"letter":"y","data":["呀","已"]}
// ]"
// var testData = [{"name":"葛云","sex":"女","tel":null},{"name":"护士1","sex":"女","tel":null},{"name":"吴宏章","sex":"男","tel":"13851284352"},{"name":"朱丽娟","sex":"女","tel":null},{"name":"芦春磊","sex":"男","tel":null},{"name":"钟焱镭","sex":"男","tel":null},{"name":"王兴超","sex":"男","tel":null},{"name":"何文婷","sex":"女","tel":null},{"name":"林玲玲","sex":"女","tel":null},{"name":"周津","sex":"女","tel":null},{"name":"朱文悦","sex":"女","tel":null},{"name":"张玲玲","sex":"女","tel":null},{"name":"成宏","sex":"男","tel":null},{"name":"黄莉","sex":"男","tel":null},{"name":"成玲","sex":"女","tel":null},{"name":"洗牙","sex":null,"tel":null},{"name":"王倩","sex":null,"tel":null},{"name":"朱立柱","sex":"男","tel":"85489569"},{"name":"杨光荣","sex":null,"tel":null},{"name":"李志巍","sex":"女","tel":null},{"name":"孙耀方","sex":"女","tel":null},{"name":"前台","sex":null,"tel":null},{"name":"南京精义齿","sex":null,"tel":null},{"name":"二楼共用","sex":null,"tel":null},{"name":"张庆芳","sex":"女","tel":null},{"name":"徐燕秋","sex":"女","tel":null},{"name":"王芳","sex":"女","tel":null},{"name":"周小霜","sex":"女","tel":null},{"name":"周珍珍","sex":"女","tel":null},{"name":"张洪洋","sex":"女","tel":null},{"name":"卞晓师","sex":"女","tel":null},{"name":"二楼挂号","sex":null,"tel":null},{"name":"四楼挂号","sex":null,"tel":null},{"name":"葛云洗牙","sex":"女","tel":null},{"name":"南京精义","sex":null,"tel":null},{"name":"徐陈","sex":null,"tel":null},{"name":"闫蕊","sex":null,"tel":null},{"name":"金曼曼","sex":null,"tel":null},{"name":"潘春兰","sex":null,"tel":null},{"name":"成金平","sex":null,"tel":null},{"name":"闫蕊","sex":null,"tel":null},{"name":"张洪洋","sex":null,"tel":null},{"name":"徐婕","sex":"女","tel":null},{"name":"徐惠口腔","sex":null,"tel":null},{"name":"苏俊","sex":"女","tel":null},{"name":"郭波","sex":"男","tel":null},{"name":"李红婷","sex":"女","tel":null},{"name":"彭焱","sex":null,"tel":null},{"name":"盛兴蓉","sex":null,"tel":null},{"name":"赵远方","sex":null,"tel":null},{"name":"义诊","sex":null,"tel":null},{"name":"仓库","sex":null,"tel":null},{"name":"办公室","sex":null,"tel":null},{"name":"财务","sex":null,"tel":null},{"name":"闻晓玲","sex":null,"tel":null},{"name":"食堂","sex":null,"tel":null},{"name":"东院","sex":null,"tel":null},{"name":"东院供应室","sex":null,"tel":null},{"name":"医美","sex":null,"tel":null},{"name":"东院洗牙","sex":null,"tel":null},{"name":"石晶云","sex":"女","tel":null},{"name":"孙善文","sex":"女","tel":null},{"name":"陈汝花","sex":"女","tel":null},{"name":"新院初诊挂号","sex":null,"tel":null},{"name":"新院复诊挂号","sex":null,"tel":null},{"name":"新院洗牙","sex":null,"tel":null},{"name":"成宏（新院）","sex":null,"tel":null},{"name":"吴宏章（新院）","sex":null,"tel":null},{"name":"芦春磊（新院）","sex":null,"tel":null},{"name":"成玲（新院）","sex":null,"tel":null},{"name":"朱丽娟（新院）","sex":null,"tel":null},{"name":"钟焱镭（新院）","sex":null,"tel":null},{"name":"石晶云（新院）","sex":null,"tel":null},{"name":"新院正畸挂号","sex":null,"tel":null},{"name":"成岱嵘","sex":"男","tel":null},{"name":"鲍加佳","sex":null,"tel":null},{"name":"林禹彤","sex":null,"tel":null},{"name":"总院前台","sex":null,"tel":null},{"name":"王倩新院","sex":null,"tel":null},{"name":"王秀","sex":null,"tel":null},{"name":"李师傅","sex":null,"tel":null},{"name":"老院维修费","sex":null,"tel":null},{"name":"王莹","sex":null,"tel":null},{"name":"刘琼芝","sex":null,"tel":null},{"name":"陈密","sex":null,"tel":null},{"name":"王舒","sex":"女","tel":null},{"name":"丁文翠","sex":null,"tel":null},{"name":"总院共用","sex":null,"tel":null},{"name":"老院公用不扣钱","sex":null,"tel":null},{"name":"李晶","sex":null,"tel":null},{"name":"高伟","sex":"男","tel":null},{"name":"总院维修费不扣","sex":null,"tel":null},{"name":"许平","sex":null,"tel":null},{"name":"卞盼盼","sex":null,"tel":null},{"name":"刘阳","sex":null,"tel":null},{"name":"薛峰","sex":null,"tel":null},{"name":"王歆","sex":"男","tel":null},{"name":"赵向东","sex":"男","tel":null},{"name":"籍增平","sex":"男","tel":null},{"name":"总院保洁","sex":null,"tel":null},{"name":"张子城","sex":"男","tel":null}]
// console.log(JSON.stringify(pySegSort(testData)))
function pySegSort(arr, empty) {
  // 如果方法不能使用，则返回空，支持IOS10及以上，Android26及以上
  if (!String.prototype.localeCompare) { return null }
  console.log('before_sort', arr)

  arr.sort((a, b) => {
    return a.name.localeCompare(b.name, 'zh')
  })

  console.log('after_sort', arr)

  var letters = '*abcdefghjklmnopqrstwxyz'.split('')
  var zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('')

  var segs = []
  var curr = {}
  $.each(letters, function(i, letter) {
    // curr = { letter: this, data: [] }
    // curr[letter] = []
    const upperCaseLetter = letter.toUpperCase();
    $.each(arr, function(j, element) {
      if ((!zh[i - 1] || zh[i - 1].localeCompare(this.name, 'zh') <= 0) && this.name.localeCompare(zh[i], 'zh') == -1) {
        if(!curr[upperCaseLetter]) {
          curr[upperCaseLetter] = [{
            pic: '',
            sex: element.sex === "女" ? 'girl': 'boy',
            name: element.name,
            tel: element.tel || '暂无'
          }]
        } else {
          curr[upperCaseLetter].push({
            pic: '',
            sex: element.sex === "女" ? 'girl': 'boy',
            name: element.name,
            tel: element.tel || '暂无'
          })
        }
      }
      // segs.push(curr)
    })
    // if (empty || curr[letter] && curr[letter].length) {
    //   segs.push(curr)
    //   curr[letter].sort(function(a, b) {
    //     return a.localeCompare(b, 'zh')
    //   })
    // }
  })
  return curr
}

function _transformContacts(data) {
  // data = ['梦琪', '忆柳', '之桃', '慕青', '问兰', '尔岚', '元香', '初夏', '沛菡', '傲珊', '曼文', '乐菱', '痴珊', '恨玉', '惜文', '香寒', '新柔', '语蓉', '海安', '夜蓉', '涵柏', '水桃', '醉蓝', '春儿', '语琴', '从彤', '傲晴', '语兰', '又菱', '碧彤', '元霜', '怜梦', '紫寒', '妙彤', '曼易', '南莲', '紫翠', '雨寒']
  // 排序
  const sortedData = data.sort((a, b) => {
    return ('' + pinyin(a.name, { style: pinyin.STYLE_FIRST_LETTER })).localeCompare('' + pinyin(b.name, { style: pinyin.STYLE_FIRST_LETTER }))
  })

  // console.log(pinyin('卞'))
  // console.log(sortedData)
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
        sex: element.sex === "女" ? 'girl': 'boy',
        name: element.name,
        tel: element.tel || '暂无'
      }]
    } else {
      arr[letter].push({
        pic: '',
        sex: element.sex === "女" ? 'girl': 'boy',
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
  console.log('before', JSON.stringify(data))
  const tempObj = {
    contacts: pySegSort(data)
  }
  console.log('after', tempObj.contacts)
  // console.log(tempObj.contacts)
  const ele = document.getElementById(id)
  ele.classList.add('_contact')
  ele.innerHTML = Contacts(tempObj)
  // 右边标签的高度
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
    var dheight = event.originalEvent.changedTouches[0].clientY;
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
      var zztel = $(this).children('div').children('div').children('span')[1].innerHTML;
      var zzname =  $(this).children('div').children('div').children('span')[0].innerHTML;
      if (tel!='暂无')
      {
          window.js.invokeCall(zztel);
      }
      else
      {
          window.js.showToast(zzname+"暂无手机号");
      }
  })
  return exportModule
}
module.exports = exportModule

