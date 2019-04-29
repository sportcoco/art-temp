'use strict';
process.env.NODE_ENV = 'production';

const merge = require('webpack-merge');
const baseConf = require('./webpack.base.conf');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = merge(baseConf, {
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
});
