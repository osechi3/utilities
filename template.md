# NPM Template

## Packages

+ Webpack + Webpack CLI
+ Webpack Dev Server
+ ESLint
+ Babel [core, preset-env]
+ Jest
+ Babel Jest
+ PubSub JS

### Loaders

+ Style Loader
+ CSS Loader
+ Babel Loader
+ Eslint Loader

### Plugins

+ Clean Webpack Plugin
+ HTML Webpack Plugin
+ Mini CSS Extract Plugin
+ Optimize CSS Assets Plugin

------

## Commands

```shell
npm init -y
```

```shell
npm install --save-dev webpack webpack-cli webpack-dev-server clean-webpack-plugin html-webpack-plugin eslint style-loader css-loader babel-loader @babel/core @babel/preset-env eslint-loader jest babel-jest pubsub-js mini-css-extract-plugin optimize-css-assets-webpack-plugin
```

------

------------

+ package.json

```diff
- "main": "index.js"
+ "private": "true"
```

```json
"scripts": {
  "test": "jest --watch --runInBand",
  "build": "webpack",
  "build:prod": "webpack --config webpack.config.prod.js",
  "start": "webpack-dev-server"
}
```

+ webpack.config.js

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },

  devtool: 'cheap-module-eval-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },

      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          'babel-loader?compact=false',
          'eslint-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' })
  ]
}

```

+ webpack.config.prod.js

```javascript
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/app.js',

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),

    /* name of the repo (if deploying to gh-pages)
      or '/' (if deploying to firebase) */
    publicPath: '/'
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },

      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsPlugin()
  ]
}

```

+ babel.config.js

```javascript
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]
}

```

+ ESLint

>./node_modules/.bin/eslint --init

```diff
+ env: { jest: true }
```

+ Jest

>./node_modules/.bin/jest --init

------

## Folder Structure

+ src
  + components
  + styles
  + tests

------

## Initial Files

+ src/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta charset="UTF-8">
    <title></title>
  </head>
  <body>
    <div id="app">
    </div>
  </body>
</html>
```
