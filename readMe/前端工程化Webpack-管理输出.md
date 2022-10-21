# **Webpack管理输出**

## HtmlWebpackPlugin 可以用来管理我们的打包输出的 html

将 html-webpack-plugin 安装到开发依赖中

```bash
pnpm install -D html-webpack-plugin
```

如下配置:

```javascript
  plugins: [
    new HtmlWebpackPlugin({title: '管理输出',})
  ]
```

完整示例:

```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    entry: {
      index: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
      new HtmlWebpackPlugin({title: '管理输出',})
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
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

_______________________

## 清理输出文件夹

如下配置:

```javascript
  output: {
    clean: true,
  },
```

完整示例:

```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    entry: {
      index: './src/index.js',
      print: './src/print.js'
    },
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

_________________________
