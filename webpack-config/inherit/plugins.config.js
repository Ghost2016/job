const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const dirVars = require('../base/dir-vars.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const pageArr = require('../base/page-entries.config.js');
const utils = require('../base/utils')
const entry = utils.getMultiEntry(dirVars.pagesDir + '/**/**/*html*') //通过html查找
const pageArr = Object.keys(entry)

const HashOutput = require('webpack-plugin-hash-output');

let configPlugins = [

  /* 全局shimming */
  // 使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
  }),
  /* 抽取出所有通用的部分 */
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons/commons',      // 需要注意的是，chunk的name不能相同！！！
    filename: '[name]/bundle.[chunkhash].js',
    minChunks: 2,
  }),
  /* 抽取出三方插件部分 */
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   // chunks: ['common'],
  //   filename: 'vendor.[chunkhash].js'
  // }),
  /* 抽取出webpack的runtime代码()，避免稍微修改一下入口文件就会改动commonChunk，导致原本有效的浏览器缓存失效 */
  new webpack.optimize.CommonsChunkPlugin({
    name: 'webpack-runtime',
    filename: 'commons/commons/webpack-runtime.[hash].js',
  }),
  /* 抽取出chunk的css */
  new ExtractTextPlugin('[name]/styles.[contenthash].css'),
  /* 配置好Dll */
  // new webpack.DllReferencePlugin({
  //   context: dirVars.RootDir, // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
  //   manifest: require('../../manifest.json'), // 指定manifest.json
  //   name: 'dll',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  // }),
  new HashOutput({
    manifestFiles: 'webpack-runtime', // 指定包含 manifest 在内的 chunk
  }),
  // 把/static文件夹的文件复制到目标文件夹去
  new CopyWebpackPlugin([{
    from: dirVars.staticSrcDir,
    to: dirVars.staticBuildDir,
    force: true
  }])
];

  
pageArr.forEach((page) => {
  // console.log(entry[page])
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${page}/page.html`,
    // 模板路径
    template: entry[page],
    chunks: ['webpack-runtime', page, 'commons/commons'],
    hash: true, // 为静态资源生成hash值
    inject: true  // js插入底部
    // xhtml: true,
  });
  configPlugins.push(htmlPlugin)
});

const htmlPlugin = new HtmlWebpackPlugin({
  filename: `index.html`,
  // 模板路径
  template: dirVars.srcRootDir + '/index.html',
  inject: false,
  chunks: []
});
configPlugins.push(htmlPlugin)

// console.log(configPlugins)
module.exports = configPlugins