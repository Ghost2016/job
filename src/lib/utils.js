
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
export function Timer({ LeftArrowId, RightArrowId, TextId, onAdd, onMinus, regFormat, inputId, onChange }) {
  this.today = new Date()
  // 改变的天数
  this.changeIndex = 0
  // 用于显示时间的文本
  this.textDom = $(`#${TextId}`)
  // 显示时间文的格式
  this.regFormat = regFormat || 'YYYY年MM月DD日'
  this.regTimeFormat = regTimeFormat || 'YYYY-MM-DD'
  // 格式化后的时间
  this.formattedTime = moment(this.today).add(this.changeIndex, 'days').format(this.regTimeFormat)
  // 格式化后的时间文本
  this.formattedTimeText = moment(this.today).format(this.regFormat)
  // 填充文本
  this.textDom.html(this.formattedTimeText)
  // 用于生成时间选择器的隐藏的输入框
  this.inputId = inputId || 'timer-hidden'
  this.onChange = onChange
  $(`#${LeftArrowId}`).on('click', () => {
    this.minusOneDay()
    this.onChange(this.formattedTime)
  })
  $(`#${RightArrowId}`).on('click', () => {
    this.addOneDay()
    this.onChange(this.formattedTime)
  })
  this.selector = null
}

Timer.prototype.show = function() {
  console.log(this.formattedTime)
  var that = this
  if(!this.selector) {
    this.selector = window.mobiscroll.date(`#${this.inputId}`,{
      dateFormat: `yy-mm-dd`,
      lang: 'zh',
      onSet: function(textVale,inst) { //选中时触发事件
        // console.log(textVale.valueText)
        var selectedTime = moment(textVale.valueText,'YYYY-MM-DD')
        var today = moment(that.today)
        that.changeIndex = (-Math.floor(today.diff(selectedTime) / 1000 / 60 / 60 / 24))
        that.onTimeChange()
        that.onChange(that.formattedTime)
      },
    })
    this.selector.setVal(this.formattedTime)
  } else {
    this.selector.setVal(this.formattedTime)
  }
  this.selector.show()
}

Timer.prototype.getParsedTime = function() {
  return this.formattedTime
}

Timer.prototype.addOneDay = function() {
  this.changeIndex++
  this.onTimeChange()
}

Timer.prototype.minusOneDay = function() {
  this.changeIndex--
  this.onTimeChange()
}

Timer.prototype.onTimeChange = function() {
  this.formattedTime = moment(this.today).add(this.changeIndex, 'days').format('YYYY-MM-DD')
  this.formattedTimeText = moment(this.today).add(this.changeIndex, 'days').format(this.regFormat)
  this.textDom.html(this.formattedTimeText)
}


// 转换成YYYY-MM-DD格式
Timer.parseTime = function(date) {
  return moment(date).format('YYYY-MM-DD')
}

export function getToken() {
  return 'EqVGmprQIExNQP4PgRw3FKwPIKtKaG0G'
}

