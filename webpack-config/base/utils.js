
const glob = require('glob')
const path = require('path')

console.log(111)
const dirVars = require('./dir-vars.config.js');



let utils = {}
utils.getMultiEntry = function (globPath) {
  var entries = {},
    basename, tmp, pathname;
  // 遍历page
  glob.sync(globPath).forEach(function (entry) {
    // 文件名字，去掉了后缀
    basename = path.basename(entry, path.extname(entry));
    // 获取路径的后三位
    tmp = entry.split('/').splice(-4);
    // console.log(tmp+'-----------');
    pathsrc = tmp[1] + '/' + tmp[2]
    // 保持文件夹的名字与文件夹下的html和js名字一致
    pathname = pathsrc; 
    entries[pathname] = entry;
    // console.log(pathname+'-----------'+entry);
  });
  return entries;
}
// getMultiEntry(dirVars.pagesDir + '/**/**/*html*') //通过html查找
console.log(dirVars.pagesDir + '/**/**/*html*') //通过html查找

module.exports = utils
