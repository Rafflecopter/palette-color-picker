/* eslint-disable */

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const keysXForm = require('ts-transformer-keys/transformer').default


// Path Helpers
const withPath = (...p) => (...sub) => path.join(__dirname, ...p, ...sub)
const SRC = withPath('src')
const STATIC = withPath('static')
const DIST = withPath('dist')


// Config

module.exports = {

  entry: SRC('/index.tsx'),

  output: {
    filename: 'app.js',
    path: DIST()
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'],
    alias: {
      '~': SRC(),               // general convenience
      '#': SRC('/style'),       // main sass import
      '@': SRC('/components')   // main tsx import
    }
  },

  module: {
    loaders: [
      {
        test: /\.tsx?/,
        include: SRC(),
        loader: [ 'awesome-typescript-loader' ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(jpg|png|gif)(\?.+)?$/,
        loader: 'url-loader?limit=100000',
        include: STATIC('img')
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'svg/'
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false }
              ]
            }
          }
        ]
      },
      {
        test: /(\.scss|\.css|\.png)$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: (loader) => [
                  require('autoprefixer')
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }]
          })
        )
      }
    ],
  },

  plugins: [

    new ExtractTextPlugin({ filename: 'picker.css' }),

    new HtmlWebpackPlugin({
      title: 'Palette Color Picker',
      template: SRC('index.html')
    }),
  ]

}
