const { merge } = require('webpack-merge');
const common = require('../webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development', // 开发模式
  devtool: 'inline-source-map', // 方便调试
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR 插件（仅在开发中使用）
  ],
  watch: true, // 自动监控文件变化
});
