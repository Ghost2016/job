if (APP_ENV!== 'production') { //eslint-disable-line
  require('./html.js')
}
require('@/lib/common.js')
import './page.less'
const Native = require('@/lib/native.js')
const type = getSearchParam('type')
var array = []
// 统一id
var id = 0
$(function() {
    addChecker()
    $('.teeth-position-check-items').on('click', '.turn-to-teeth', function(){
        Native.startNextActivity(
            {
                nexturl: HTML_BASE_URL_PREFIX + `patient/teethPositionSelect/page.html?id=${id}`,
                nextparam: '',
                title: '牙位检查',
                flag:5,
            }
        )
    })
    // window.funRightTouch = function(value) {
    //     // 写当前页面 原生调用后的逻辑
    //     js.setBackWithValue('返回选择结果');
    // }
    // 删除
    $('.teeth-position-check-items').on('click', '.option-delete', function(){
        var item = $(this).parent().parent()
        let dataID = item.attr('data-id')
        alert(dataID)
        array = array.filter(o => {
            return o.id !== dataID
        })
        // console.log(array)
        item.remove()
    })
    // 添加多个检查
    $('#addMore').on('click', function(){
        // alert(1)
        console.log(array)
        addChecker()
    })
})
// 添加一个检查
function addChecker() {
    array.push({
        id: ++id,
        text: '',
        p1: '',
        p2: '',
        p3: '',
        p4: ''
    })
    $('#teeth-position-check-items').append(`
        <div class="teeth-position-check-item" id="item${id}">\
            <p class="turn-to-teeth">\
                <label>牙位检查:</label>\
                <input readonly placeholder="" value="牙位图选择"/>\
                <span class="arraw-into"></span>\
            </p>\
            <textarea placeholder="请输入检查诊断结果或治疗方案"></textarea>\
            <footer class="option">\
                <div class="option-delete">删除</div>\
            </footer>\
        </div>\
    `)
}


window.funSelectCallBack = function(jsonString) {
    var p = JSON.parse(jsonString)
    var BreakException = {};
    try {
        array.forEach((ele,index) => {
            if((ele.id-0) === (p.id-0)) {
                ele.p1 = p.p1
                ele.p2 = p.p2
                ele.p3 = p.p3
                ele.p4 = p.p4
                throw BreakException;
            }
        })
    } catch (e) {
        if (e !== BreakException) throw e;
    }
    console.log(array)
}

window.funRightTouch = function() {
    array.forEach((ele,index) => {
        ele.text = $(`#item${ele.id} textarea`).val()
    })
    console.log(array)

    js.setBackWithValue(JSON.stringify({array:array,type:type}));
}