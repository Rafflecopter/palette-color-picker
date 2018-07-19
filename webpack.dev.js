/* eslint-disable */
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,

    contentBase: path.join(__dirname, 'static')
  },

  devtool: 'inline-cheap-module-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(process.env.NODE_ENV !== 'production'),
    }),
  ]
})
