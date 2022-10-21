# **Webpack工程化-开发环境**

## Webpack 提供 webpack's Watch Mode 模式, 监听模块代码变化进行重新打包

> Watch Mode 并不支持浏览器自动刷新, 还是需要手动刷新浏览器

运行如下命令:

```bash
  webpack --watch
```

也可以配置在 package.json 文件的 script 中:

```json
  "scripts": {
    "watch": "webpack --watch"
  },
```

完整示例:

```json
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
    "private": true,
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "npx webpack --config webpack.config.js",
      "watch": "webpack --watch"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "css-loader": "^6.7.1",
      "html-webpack-plugin": "^5.5.0",
      "style-loader": "^3.3.1",
      "webpack": "^5.74.0",
      "webpack-cli": "^4.10.0"
    },
    "dependencies": {
      "lodash": "^4.17.21"
    }
  }
```

____________________

## 使用 webpack-dev-server

webpack-dev-server 提供了一个基础的 web server, 并且具有 live reloading (实时重新加载) 功能.

- 首先安装 webpack-dev-server

```bash
  pnpm install -D webpack-dev-server
```

webpack.config.js 如下配置:

```javascript
  devServer: {
    static: './dist'
  },
  optimization: {
    runtimeChunk: 'single',
  }
```

在 package.json 里添加运行命令

```javascript
  "scripts": {
    "start": "webpack serve --open"
  }
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
  devServer: {
    static: './dist',
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
  optimization: {
    runtimeChunk: 'single',
  }
};
```