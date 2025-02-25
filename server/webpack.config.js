// webpack.config.js
const path = require('path');
 
module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, '../bin'), // 输出目录
    filename: 'server.js' // 输出文件名
  },
  target: 'node', // 指定Webpack以Node.js环境为目标
  module: {
    rules: [
      {
        test: /\.js$/, // 针对JavaScript文件
        use: {
          loader: 'babel-loader', // 使用Babel来转译JavaScript代码
          options: {
            presets: ['@babel/preset-env'] // 使用Babel预设来转译现代JavaScript为旧版本JavaScript
          }
        },
        exclude: /node_modules/ // 排除node_modules目录
      }
    ]
  }
};