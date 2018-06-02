const path = require('path')
let moduleExports = {}

// 项目根目录
moduleExports.RootDir = path.resolve(__dirname, '../../')
// 项目业务代码根目录
moduleExports.srcRootDir = path.resolve(moduleExports.RootDir, './src')
// 存放各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
moduleExports.pagesDir = path.resolve(moduleExports.srcRootDir, './pages')

// 生成文件目录
// 存放编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）
moduleExports.buildDir = path.resolve(moduleExports.RootDir, './build')
// 存放由各种不常改变的js/css打包而来的dll
moduleExports.dllDir = path.resolve(moduleExports.srcRootDir, './dll')
// 存放不遵循CMD格式的代码,html页面里面直接引用
moduleExports.staticSrcDir = path.resolve(moduleExports.srcRootDir, './static')
// 存放打包好的静态文件
moduleExports.staticBuildDir = path.resolve(moduleExports.buildDir, './static')
// 存放公共布局的文件夹
moduleExports.layoutDir = path.resolve(moduleExports.srcRootDir, './layout')

module.exports = moduleExports