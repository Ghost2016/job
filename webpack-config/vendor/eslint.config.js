var path = require('path');
var dirVars = require('../base/dir-vars.config.js');
module.exports = {
  configFile: path.resolve(dirVars.RootDir, './.eslintrc.js'),
  failOnWarning: false,
  failOnError: false,
  cache: true
}
