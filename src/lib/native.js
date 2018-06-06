
const Native = {}
/**
 *
 * @param {Object} jsonValue json字符串,具体定义如下:
 *  “nexturl”：“下一个页面的相对路径（如果带参数，则nextparam不能传值，只能传空串）”，
 *  “nextparam”：“下一个页面的url参数”，
 *  “title”：“下一个页面的标题”，
 *  “flag”：“下一个页面，导航栏状态”，
 *  Flag值说明：
  * 1，表示基本的只有返回按钮跟标题
  * 2，右上角是文字 "发起"
  * 3，右上角是分享图标
  * 4，右上角是联系人查询图标。
 */

Native.startNextActivity = function(jsonValue) {
  const tempObject = {
    nexturl: jsonValue.nexturl || '',
    nextparam: jsonValue.nextparam || '',
    title: jsonValue.title || '',
    flag: jsonValue.flag || 1
  }
  window.js.startNextActivity(JSON.stringify(tempObject))
}
/**
 * @param {*} key key表示存储的字段名。
 * @param {*} val Value表示存储的值内容
 */
Native.saveLocalParam = function(key, val) {
  window.js.saveLocalParam(key, JSON.stringify(val))
}
/**
 * @param {*} key key表示存储的字段名。
 */
Native.getLocalParam = function(key) {
  return JSON.parse(window.js.getLocalParam(key)) || ''
}

// 4. 读取登录数据
//    js.getLocalParam(“sp_pre_login_data”);

/**
 * 结束当前页面
*/
Native.backAction = function() {
  window.js.backAction()
}

/**
 * 选择患者
 */
Native.selectPatient = function() {
    window.js.selectPatient()
}

/**
 * 显示toast
 */
Native.showToast = function(value) {
    window.js.showToast(value)
}

/**
 * 选择地址
 */
Native.chooseLocation = function() {
    window.js.chooseLocation()
}

// 6. 当前页面对上一页面数据有更新，则在当前页面直接调用backAction前执行如下方法
//    js.saveLocalParam(“sp_pre_refresh_data”, “1”)

// 7. 退出登录
//   js.logoOutAction();

// 8. 导航栏右边按钮响应事件：在每个页面里面实现
// value有值的情况是当前右上角按钮是搜索.
// function funRightTouch(value) {
        // 写当前页面 原生调用后的逻辑
// }

// 9. 当下一页进行内容选择， 需要将值带回当前页
//    当前页跳转下一页的flag = 5.  下一页选中后，调用
//     js.setBackWithValue('返回选择结果');
// 当前页需要实现方法：
// function funSelectCallBack(value) {
//     // 更新逻辑 在此完成
// }

// 10. 获取缓存数据

/**
 * 设置页面标题方法
 * @param {*} title 标题
 */
Native.setTitle = function(title) {
  window.js.setTitle(title)
}
/**
 * 关闭当前页面
 * @param {Boolean} needRefresh 前一页面是否需要刷新
 */
Native.handleBackAction = function(needRefresh) {
  needRefresh && window.js.saveLocalParam('sp_pre_refresh_data', '1')
  // alert(window.js.getLocalParam('sp_pre_refresh_data'))
  window.js.backAction()
}

module.exports = Native
