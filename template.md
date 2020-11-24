# NPM Template

## Packages

### General

+ Webpack + Webpack CLI
+ Webpack Dev Server
+ Clean Webpack Plugin
+ ESLint
+ Eslint Loader
+ Babel [core, preset-env]
+ Babel Loader
+ Jest
+ Babel Jest
+ PubSub JS

### CSS

+ Style Loader
+ CSS Loader
+ Stylelint
+ normalize.css
+ Mini CSS Extract Plugin
+ Optimize CSS Assets Plugin

### HTML

+ HTML Webpack Plugin

### Assets

+ Copy Webpack Plugin
+ Imagemin WebP Webpack Plugin (converting images to .webp)
+ Imagemin Webpack Plugin (minifying images)
  + Imagemin Mozjpeg Plugin

------

## Commands

```shell
npm init -y
```

```shell
npm install --save-dev webpack webpack-cli webpack-dev-server clean-webpack-plugin html-webpack-plugin eslint style-loader css-loader babel-loader @babel/core @babel/preset-env eslint-loader jest babel-jest pubsub-js mini-css-extract-plugin optimize-css-assets-webpack-plugin stylelint stylelint-config-standard stylelint-order stylelint-config-rational-order copy-webpack-plugin imagemin-webpack-plugin imagemin-webp-webpack-plugin imagemin-mozjpeg

npm install normalize.css sharp
```

------

## Configuration

+ package.json

```diff
- "main": "index.js"
+ "private": "true"
```

```json
"scripts": {
  "test": "jest --watch --runInBand",
  "build": "webpack --config webpack.config.js",
  "build:prod": "webpack --config webpack.config.prod.js",
  "start": "webpack serve --config webpack.config.js"
}
```

+ webpack.config.js

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ImageminWebpPlugin = require('imagemin-webp-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

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

  devtool: 'inline-source-map',

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
    new HtmlWebpackPlugin({ template: 'src/index.html' }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/images',
          to: path.resolve(__dirname, 'dist/assets/images')
        }
      ]
    }),

    new ImageminWebpPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 60
        }
      }]
    }),

    new ImageminPlugin({
      jpegtran: null,
      gifsicle: null,
      optipng: null,

      plugins: [
        imageminMozjpeg({
          quality: 75,
          progressive: true
        })
      ]
    })
  ]
}

```

+ webpack.config.prod.js

```javascript
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ImageminWebpPlugin = require('imagemin-webp-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/app.js',

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),

    /* name of the repo (if deploying to gh-pages) ('/repo-name/')
      or '/' (if deploying to firebase) */
    publicPath: '/'
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },

  devtool: false,

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
    new OptimizeCssAssetsPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/images',
          to: path.resolve(__dirname, 'dist/assets/images')
        }
      ]
    }),

    new ImageminWebpPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 60
        }
      }]
    }),

    new ImageminPlugin({
      jpegtran: null,
      gifsicle: null,
      optipng: null,

      plugins: [
        imageminMozjpeg({
          quality: 75,
          progressive: true
        })
      ]
    })
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

+ .stylelintrc.json

```json
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-rational-order"
  ],
  "rules": {
    "declaration-empty-line-before": null,
    "order/properties-order": [],
    "plugin/rational-order": [true, {
      "border-in-box-model": false,
      "empty-line-between-groups": true
    }],
    "number-leading-zero": "never"
  }
}

```

+ Jest

>./node_modules/.bin/jest --init

------

## Folder Structure

+ src
  + components
  + styles
  + tests
  + assets
    + images
    + fonts

------

## Initial Files

+ src/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="app">
      Hello world
    </div>
  </body>
</html>

```

+ src/app.js

```js
import './styles/app.css'
import 'normalize.css'

console.log('Hello world')

```

+ src/styles/app.css

```css
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

#app {
  background-color: green;
}

```
+ imageResizing.js (file in the repository)
+ sandbox.js
+ `README.md`
+ `PLAN.md`
+ .gitignore

```git
node_modules
sandbox.js
PLAN.md
dist

```
