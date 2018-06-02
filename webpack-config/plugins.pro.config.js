const webpack = require('webpack')
const pluginsConfig = require('./inherit/plugins.config.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
/* webpack1下，用了压缩插件会导致所有loader添加min配置，而autoprefixser也被定格到某个browers配置 */
// pluginsConfig.push(new webpack.optimize.UglifyJsPlugin({
//   ie8: true,
//   compress: {
//     warnings: false
//   }
// }))

// 用于解决uglifyJS无法打包es6的pinyin的包
pluginsConfig.push(new UglifyJSPlugin({
  // ie8: true,
  // compress: {
  //   warnings: false
  // }
}))


pluginsConfig.push(new webpack.DefinePlugin({
  APP_ENV: JSON.stringify('production'),
  HTML_BASE_URL_PREFIX: JSON.stringify('../../')
}))

pluginsConfig.push(new webpack.NoEmitOnErrorsPlugin()); // 配合CLI的--bail，一出error就终止webpack的编译进程

pluginsConfig.push(new webpack.LoaderOptionsPlugin({
  options: {
    postcss: require('./vendor/postcss.config.js'),
    eslint: require('./vendor/eslint.config.js')
  }
}))

/* HashedModuleIdsPlugin 这个插件，他是根据模块的相对路径生成一个长度只有四位的字符串作为模块的 module id ，
这样就算引入了新的模块，也不会影响 module id 的值，只要模块的路径不改变的话。 */
pluginsConfig.push(new webpack.HashedModuleIdsPlugin())

module.exports = pluginsConfig