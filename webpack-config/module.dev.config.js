const dirVars = require('./base/dir-vars.config.js')
const moduleConfig = require('./inherit/module.config.js')
const eslintFormatter = require('eslint-friendly-formatter')

/*
  由于ExtractTextPlugin不支持热更新，因此选择在开发环境下直接用style-loader加载样式。
  如有问题，可切换回ExtractTextPlugin，即使不能用热更新，也可实现LiveReload
*/
// 在开发阶段才会进行检查
moduleConfig.rules.push({
  test: /\.js$/,
  enforce: 'pre',
  loader: 'eslint-loader',
  include: dirVars.srcRootDir,
  options: {
    formatter: eslintFormatter,
    emitError: false,
    emitWarning: true,
    fix: false
  }
})
moduleConfig.rules.push({
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    
  ],
})

moduleConfig.rules.push({
  test: /\.less$/,
  include: dirVars.srcRootDir,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'less-loader',
    },
  ],
});
moduleConfig.rules.push({
  test: /\.html$/,
  loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
});

module.exports = moduleConfig