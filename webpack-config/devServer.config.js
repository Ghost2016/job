module.exports = {
  contentBase: './build',
  host: '0.0.0.0',
  port: 8087, // 默认8089
  inline: true, // 可以监控js变化
  // hot: true, // 热启动
  compress: true,
  watchContentBase: false,
  // index: 'pages/index/buy/page.html',
  // 取消打包时打印信息，包括错误信息
  quiet: true,
  proxy: {
    '/v1': {
      // target: 'http://47.94.212.178:8081',
      target: 'http://app.kq123.com/QSYYAPI/api/',
      changeOrigin: true,
      secure: false,
      // 修复webpack-dev-server无法正确转发的问题
      pathRewrite: { '^/v1': '' },
    }
  }
}
