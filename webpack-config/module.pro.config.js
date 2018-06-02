const ExtractTextPlugin = require('extract-text-webpack-plugin')
const dirVars = require('./base/dir-vars.config.js')
const moduleConfig = require('./inherit/module.config.js')

const autoprefixer = require('autoprefixer')

moduleConfig.rules.push({
  test: /\.css$/,
  exclude: /node_modules/,
  // loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss'),
  use: ExtractTextPlugin.extract([
    {
      loader: 'css-loader',
      options: {
        minimize: true,
        '-autoprefixer': true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [autoprefixer({ browsers: ['iOS >= 7', 'Android >= 4.1'] })],
      }
    }
  ])
})

moduleConfig.rules.push({
  test: /\.less$/,
  include: dirVars.srcRootDir,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: true,
          '-autoprefixer': true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoprefixer({ browsers: ['iOS >= 7', 'Android >= 4.1'] })],
        }
      },
      {
        loader: 'less-loader'
      }
    ],
    publicPath: '../../'
  })
})

module.exports = moduleConfig