//配置多页面
'use strict';
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const PAGE_PATH = path.resolve(__dirname, '../src');

//多入口配置
const entries = function() {
  const entryFiles = glob.sync(PAGE_PATH + '/*/entryJS/*.js');
  const map = {};
  entryFiles.forEach(filePath => {
    const fileName = filePath.substring(
      filePath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('.')
    );
    map[fileName] = filePath;
  });
  return map;
};

//多页面输出配置
const htmlPlugin = function() {
  const entryHtml = glob.sync(PAGE_PATH + '/*/*.html');
  let arrHtml = [];
  entryHtml.forEach(filePath => {
    const filename = filePath.substring(
      filePath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('.')
    );
    const conf = {
      template: filePath,
      filename: filename + '.html',
      inject: 'head',
      hash: false,
      title: filename,
      chunks: [filename, 'vendor']
    };
    arrHtml.push(new HtmlWebpackPlugin(conf));
  });
  return arrHtml;
};

//多个项目 copy配置
const copyPlugin = function() {
  const projects = fs.readdirSync('./src');
  let copy;
  let arrCopy = [];
  projects.forEach(name => {
    const conf = [
      {
        from: path.resolve(__dirname, `../src/${name}/assets`),
        to: path.resolve(__dirname, `../dist/assets`),
        ignore: ['css/**.*']
      },
      {
        from: path.resolve(__dirname, `../src/${name}/lib`),
        to: path.resolve(__dirname, `../dist/lib`)
      }
    ];
    copy = new CopyWebpackPlugin(conf);
  });
  arrCopy.push(copy);

  return arrCopy;
};

module.exports = {
  entries,
  htmlPlugin,
  copyPlugin
};
