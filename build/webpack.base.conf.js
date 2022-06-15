'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

let buildMode
if (process.env.NODE_ENV === 'production') {
  buildMode = process.env.BUILD_MODE === 'test' ? process.env.BUILD_MODE : 'build'
} else {
  buildMode = 'dev'
}

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const threadLoaderOptions = {
  poolRespawn: buildMode !== 'dev',
  poolTimeout: buildMode === 'dev' ? Infinity : 500
};

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: config[buildMode].assetsRoot,
    filename: '[name].js',
    publicPath: config[buildMode].assetsPublicPath,
    chunkFilename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },
  module: {
    rules: [{
        test: /\.(js|vue)$/,
        use: [{
            // run in multiple threads
            loader: 'thread-loader',
            options: threadLoaderOptions
          }
        ],
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.vue$/,
        use: [{
            // run in multiple threads
            loader: 'thread-loader',
            options: threadLoaderOptions
          },
          {
            loader: 'vue-loader',
            options: vueLoaderConfig,
          }
        ]
      },
      {
        test: /\.js$/,
        use: [{
            // run in multiple threads
            loader: 'thread-loader',
            options: threadLoaderOptions
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              // cache builds, future builds attempt to read from cache to avoid needing to run expensive babel processings
              cacheDirectory: true,
            }
          }
        ],
        include: [resolve('src'), resolve('config/api'), resolve('test')],
        exclude: [/[/\\\\]node_modules[/\\\\]/]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('assets/[name].[ext]'),
          esModule: false,
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({}),
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    // To only pick lodash features that are needed
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true,
      'shorthands': true
    })
  ],
};
