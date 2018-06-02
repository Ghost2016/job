const content = require('./content.ejs')
const layout = require('@/layout/layout/html.js')

module.exports = layout.init({ withMobiScroll: true }).run(content())
