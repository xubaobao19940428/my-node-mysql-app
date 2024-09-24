const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.js', // 入口文件
  target: 'node', // 目标环境是 node.js
  externals: [nodeExternals()], // 忽略 node_modules
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'bundle.js', // 输出文件名
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // 转译 JavaScript
        },
      },
    ],
  },
};
