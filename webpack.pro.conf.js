require('./npm-scripts/before-build.script');
// 打包正式开发环境
module.exports = {
  entry: require('./webpack-config/entry.config.js'),

  output: require('./webpack-config/output.config.js'),

  module: require('./webpack-config/module.pro.config.js'),

  resolve: require('./webpack-config/resolve.config.js'),

  plugins: require('./webpack-config/plugins.pro.config.js'),

  externals: require('./webpack-config/externals.config.js')
};
