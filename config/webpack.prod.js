'use strict';
process.env.NODE_ENV = 'production';

const merge = require('webpack-merge');
const baseConf = require('./webpack.base.conf');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

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

module.exports = merge(baseConf, {
  plugins: [new CleanWebpackPlugin(), new BundleAnalyzerPlugin()].concat(
    imgminPlugin
  )
});
