# **Webpack工程化之  source map**

## 使用 source map (请不要用于生产环境, 这会增加打包产物的体积)

如下配置

```javascirpt
  devtool: 'inline-source-map'
```

完整示例:

```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin({title: '管理输出',})
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        { 
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        { 
          test: /\.png/,
          type: 'asset/resource',
          generator: {
            publicPath: 'assets/',
            outputPath: 'assets/'
          }
        },
        { 
          test: /\.txt/,
          type: 'asset'
        }
      ],
    },
  };
```

[更多配置请点击](https://webpack.docschina.org/configuration/devtool)
