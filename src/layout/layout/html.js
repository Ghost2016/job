const header = require('../components/header/header.ejs')
const footer = require('../components/footer/footer.ejs')
const layout = require('./html.ejs')

const componentRenderData = {
  // 是否带有mobiscroll相关的文件
  withMobiScroll: false
}

const htmlModule = {
  // 初始化，可以传送数据到组件
  init({ withMobiScroll }) {
    componentRenderData.withMobiScroll = withMobiScroll || false
    return this
  },
  // 把组件渲染到整体布局中
  run(content) {
    const layoutRenderData = {
      header: header(componentRenderData),
      footer: footer(componentRenderData),
      content
    }
    return layout(layoutRenderData)
  }
}

module.exports = htmlModule
