const content = require('./content.ejs')
const layout = require('@/layout/layout/html.js')

module.exports = layout.init({ withMobiScroll: false }).run(content(
  {
    msgTemplate: ['预约模板', '预约模板', '预约模板', '预约模板', '预约模板', '预约模板', '预约模板']
  }
))
