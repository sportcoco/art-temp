//环境配置
'use strict';
const fs = require('fs');
const path = require('path');

const dirName = getDirNames('./src');

const config = {
  dev: {
    host: 'localhost',
    port: 9090,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: {}
  },
  build: {
    assetsRoot: path.resolve(__dirname, `../${dirName}`),
    assetsSubDirectory: 'assets',
    assetsPublicPath: './',
    dirName: dirName[0]
  }
};

const assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};

//获取文件夹名称
function getDirNames(mypath = '.') {
  const items = fs.readdirSync(mypath);
  let result = [];
  items.map(item => {
    result.push(item);
  });
  return result;
}

module.exports = {
  config,
  assetsPath
};
