var dirVars = require('./base/dir-vars.config.js');
const outputConfig = require('./output.dev.config.js');

// 修改以在file协议下访问
outputConfig.publicPath = '../../../'
module.exports = outputConfig