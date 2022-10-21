# **Webpack 资源管理**

## **Webpack 会将一些不是 js 的资源转化为 js (bundle.js)**

### 通过各种 loader 来实现转化 , 比如通过 css-loader 和 style-loader 来转化 CSS 资源

通过 pnpm 安装 loader 到项目开发依赖中

```bash
pnpm install -D style-loader css-loader
```

在 webpack.config.js 中配置

```javascript
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        { 
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ],
    },
  };
```

________________________

### 打包 images 图像

Webpack5.x 已经内置了 raw-loader, url-loader, file-loader, 分别对应asset/source, asset/inline, asset/resource 这3个资源模块类型(asset module type)

- asset/resource (file-loader): 发送一个单独的文件并导出 URL.
- asset/inline (url-loader): 导出一个资源的 data URL.
- asset/source (raw-loader): 导出资源的源代码.
示例:

```javascript
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
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
          type: 'asset/resource'
        }
      ],
    },
  };
```

__________________________

还可以自定义 outputPath 和 publicPath (打包后访问的路径)

```javascript
  generator: {
    publicPath: 'assets/',
    outputPath: 'assets/'
  }
```

示例:

```javascript
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
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
        }
      ],
    },
  };
```

_____________________________

如果需要自定义 loader 则按下面的配置添加如下代码

```javascript
type: 'javascript/auto'
```

示例:

```javascript
  module.exports = {
    module: {
    rules: [
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              }
            },
          ],
        type: 'javascript/auto'
        },
    ]
    },
  }
```

______________________

### 通用资源类型

通过设置如下代码, Webpack 会按照默认条件, 自动地在 resource 和 inline 之间进行选择

```javascript
  {
    test: /\.txt/,
    type: 'asset'
  }
```

- 小于 8kb 的文件将会视为 inline 模块类型.
- 大于等于 8kb 的文件将会视为 resource 模块类型

```javascript
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
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

____________________
