const webpack = require('webpack')
const pluginsConfig = require('./inherit/plugins.config.js');

// pluginsConfig.push(new webpack.DefinePlugin({
//   IS_PRODUCTION: false
// }));
pluginsConfig.push(new webpack.DefinePlugin({
  APP_ENV: JSON.stringify('develop'),
  // HTML_BASE_URL_PREFIX: JSON.stringify('http://10.9.37.129:8087/'),
  HTML_BASE_URL_PREFIX: JSON.stringify('http://192.168.1.102:8087/')
}))

pluginsConfig.push(new webpack.LoaderOptionsPlugin({
  options: {
    postcss: require('./vendor/postcss.config.js'),
    eslint: require('./vendor/eslint.config.js')
  },
}));

module.exports = pluginsConfig;
