const dirVars = require('../base/dir-vars.config.js')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  rules: [
    {
      test: /\.js$/,
      include: [
        dirVars.srcRootDir,
        // resolve('node_modules/pinyin'),
        // resolve('node_modules/.2.8.3@pinyin')
      ],
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        // 使用loose模式以兼容版本比较老的浏览器
        presets: [["env",]],
        // presets: [['es2015',]],
        cacheDirectory: true,
        plugins: ['transform-runtime']
      }
    },
    {
      test: /\.ejs$/,
      include: dirVars.srcRootDir,
      loader: 'ejs-loader'
    },
    {
      // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
      // 如下配置，将小于8192byte的图片转成base64码
      test: /\.(png|jpg|gif)$/,
      include: dirVars.srcRootDir,
      // loader: 'url-loader?limit=8192&name=./static/img/[hash].[ext]',
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: './static/img/[hash].[ext]'
      }
    },
    {
      // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
      test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
      include: dirVars.srcRootDir,
      // exclude: /glyphicons/,
      // loader: 'file-loader?name=static/fonts/[name].[ext]',
      loader: 'file-loader',
      options: {
        name: 'static/fonts/[name].[hash].[ext]'
      }
    },
    // 把jquery暴露出去，以兼容老式的jquery插件
    {
      test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
      loader: 'expose-loader?$!expose-loader?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
    }
  ]
}
