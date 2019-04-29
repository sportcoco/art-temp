'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConf = require('./webpack.base.conf');
const base = require('./base.conf');

module.exports = merge(baseConf, {
  devtool: 'source-map',
  devServer: {
    contentBase: false,
    host: base.config.dev.host,
    port: base.config.dev.port,
    publicPath: base.config.dev.assetsPublicPath,
    proxy: base.config.dev.proxyTable,
    inline: true,
    hot: true,
    historyApiFallback: true,
    compress: true,
    disableHostCheck: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
