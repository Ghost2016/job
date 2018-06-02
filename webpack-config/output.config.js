var dirVars = require('./base/dir-vars.config.js');
module.exports = {
  path: dirVars.buildDir,
  publicPath: process.env.NODE_ENV === 'hot' ? '/' : '../../',
  // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
  filename: '[name]/entry.[chunkhash].js',    
  chunkFilename: '[id].[chunkhash].bundle.js'
}
