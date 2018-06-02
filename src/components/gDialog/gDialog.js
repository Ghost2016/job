const GDialog = require('./gDialog.ejs')
import './gDialog.less'

const exportModule = {}
exportModule.render = function(id, jsonObj) {
  exportModule.id = id
  const tempObj = {
    // 标题
    titleText: jsonObj.titleText || '操作提示',
    // 正文
    // contentText: '',
    contentText: jsonObj.contentText || '',
    // 是否有取消按钮
    hasCancel: jsonObj.hasCancel || false,
    // 取消文本
    cancelText: jsonObj.cancelText || '有号预约',
    // 确认文本
    ensureText: jsonObj.ensureText || '无号预约',
    // 确认点击
    onEnsureClick: jsonObj.onEnsureClick || null,
    // 取消点击
    onCancelClick: jsonObj.onCancelClick || null
  }
  const ele = document.getElementById(id)
  ele.classList.add('_gDialog-wrapper')
  ele.innerHTML = GDialog(tempObj)
  $('._gDialog-footer-cancel>span')[0].addEventListener('click', (e) => {
    tempObj.onCancelClick && tempObj.onCancelClick(e)
  })
  $('._gDialog-footer-ensure>span')[0].addEventListener('click', (e) => {
    tempObj.onEnsureClick && tempObj.onEnsureClick(e)
  })
  return exportModule
}
function _noScroll(e) {
  e.preventDefault()
  e.stopPropagation()
}
exportModule.show = () => {
  document.getElementById(exportModule.id).style.display = 'flex'
  // 阻止滚动
  $('._gDialog-wrapper')[0].addEventListener('touchmove', _noScroll, true)
}
exportModule.dismiss = () => {
  document.getElementById(exportModule.id).style.display = 'none'
  // 可以滚动
  $('._gDialog-wrapper')[0].removeEventListener('touchmove', _noScroll, true)
}
module.exports = exportModule
