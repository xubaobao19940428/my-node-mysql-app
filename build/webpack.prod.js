const { merge } = require('webpack-merge');
const common = require('../webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin'); // 用于压缩 JavaScript

module.exports = merge(common, {
  mode: 'production', // 生产模式
  devtool: 'source-map', // 生产环境的 source map（可选）
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()], // 使用 Terser 压缩 JS
  },
});
