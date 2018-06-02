const path = require('path')
const dirVars = require('./base/dir-vars.config.js')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {
    '@': resolve('src'),
    '@assets': resolve('src/assets'),
    '@test': resolve('test'),
    layout: resolve('src/layout/layout/html.js')
  },
  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extensions: ['.js', '.css', '.less'],
};

console.log(resolve(dirVars.layoutDir + './layout/html.js'))
