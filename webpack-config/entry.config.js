const dirVars = require('./base/dir-vars.config.js')
const utils = require('./base/utils')

// 在pages目录里找
const entry = utils.getMultiEntry(dirVars.pagesDir + '/**/**/*.js') //通过js查找
// console.log(entry)
module.exports = entry;
