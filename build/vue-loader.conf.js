var utils = require('./utils')
var config = require('../config')

let buildMode
if (process.env.NODE_ENV === 'production') {
  buildMode = process.env.BUILD_MODE === 'test' ? process.env.BUILD_MODE : 'build'
} else {
  buildMode = 'dev'
}

const isDevelopment = process.env.NODE_ENV === 'development'
const sourceMapEnabled = isDevelopment ?
  config.dev.cssSourceMap :
  config[buildMode].productionSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: !isDevelopment
  })
}
