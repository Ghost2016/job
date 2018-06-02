
const moment = require('moment')

/**
 * 获取当前加载当前页面的地址里的query字符串的键值，如http://www.test.com?name=smith&age=20
 中的?name=smith&age=20
 * @param name 键,若name,age.该参数必填
 * @param locationSearch 备用query字符串，该参数可选.
 * @returns {*} 例如，传入"name",将得到"smith";
 */
export function getSearchParam(name, locationSearch) {
  locationSearch = locationSearch || window.location.search
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = locationSearch.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return ''
}

// 用于控制时间一天的加减
export function Timer() {
  this.today = new Date()
  this.changeIndex = 0
}

Timer.prototype.getParsedTime = function() {
  return moment(this.today).add(this.changeIndex, 'days').format('YYYY-MM-DD')
}
Timer.prototype.addOneDay = function() {
  this.changeIndex++
}
Timer.prototype.minusOneDay = function() {
  this.changeIndex--
}
Timer.parseTime = function(date) {
  return moment(date).format('YYYY-MM-DD')
}

export function getToken() {
  return 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G'
}
