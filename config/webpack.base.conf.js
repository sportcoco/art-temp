'use strict';

const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

const glob = require('glob');
const PurifyCssWebpack = require('purifycss-webpack');
const base = require('./base.conf');
const multy = require('./multy.conf');

//分离css、消除冗余css
const cssPlugins = [
  new ExtractTextWebpackPlugin({
    filename: base.assetsPath('css/[name].css')
  }),
  new PurifyCssWebpack({
    paths: glob.sync(path.resolve(__dirname, '..', 'src/**/*.html'))
  })
];

//压缩图片，在CopyWebpackPlugin 之前
const imgminPlugin = [
  new ImageminPlugin({
    test: /\.(jpe?g|png|gif|svg)$/i,
    pngquant: {
      //图片质量
      quality: '65-90'
    },
    optipng: {
      optimizationLevel: 9
    },
    plugins: [
      imageminMozjpeg({
        quality: 90,
        progressive: true
      })
    ]
  })
];

module.exports = {
  entry: multy.entries(),
  output: {
    filename: base.assetsPath('js/[name].min.js'),
    path: base.config.build.assetsRoot,
    publicPath:
      process.env.NODE_ENV === 'production'
        ? base.config.build.assetsPublicPath
        : base.config.dev.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /.(htm|html)$/i,
        exclude: /node_modules/,
        use: ['html-withimg-loader']
      },
      {
        test: /\.art$/,
        use: ['art-template-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'postcss-loader'],
          publicPath: '../../' //重点注意
        })
      },
      {
        test: /\.styl(us)?$/,
        exclude: /node_modules/,
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'stylus-loader'],
          publicPath: '../../' //重点注意
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: base.assetsPath('img/[name].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: base.assetsPath('font/[name].[ext]')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..', 'src')
    },
    extensions: ['.js', '.json']
  },
  plugins: []
    .concat(multy.htmlPlugin())
    .concat(multy.copyPlugin())
    .concat(imgminPlugin)
    .concat(cssPlugins)
};
