const webpack = require('webpack')
let webpackConf = require('./webpack.hot.conf.js')
const WebpackDevServer = require('webpack-dev-server')

var compiler = webpack(webpackConf);
var server = new WebpackDevServer(compiler, {
    contentBase: '/',
    host: '0.0.0.0',
    port: 8089, // 默认8089
    inline: true, // 可以监控js变化
    // hot: true, // 热启动
    compress: true,
    watchContentBase: false,
    // index: 'index/index/porage.html',
    // index: 'pages/recognize-figure/page.html',
    // 取消打包时打印信息，包括错误信息
    quiet: true,
    // 设置代理
    proxy: {
        '/v1': {
            // target: 'http://47.94.212.178:8081',
            target: 'http://app.kq123.com/QSYYAPI/api/',
            changeOrigin: true,
            secure: false,
            pathRewrite: { '^/v1': '' },
        }
    }
});
server.listen(8089)