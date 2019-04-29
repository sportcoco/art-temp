//环境配置
'use strict';
const path = require('path');

const config = {
  dev: {
    host: 'localhost',
    port: 9000,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: {}
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: './'
  }
};

const assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};

module.exports = {
  config,
  assetsPath
};
