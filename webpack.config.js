const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Path Helpers
const withPath = (...p) => (...sub) => path.join(__dirname, ...p, ...sub)
const STATIC = withPath('static')
const SRC = withPath('src')
const DOCS = withPath('docs')

module.exports = {
  entry: SRC('docs'),

  output: {
    path: DOCS(),
    filename: 'app.js'
  },
  resolve: {
    alias: {
      '~': SRC(),         // general convenience
      '@': SRC('/lib')    // main component import
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /(\.scss|\.css)$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')
                ]
              }
            },
            {
              loader: 'sass-loader'
            }]
          })
        )
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'picker.css' }),

    new HtmlWebpackPlugin({
      title: 'Palette Color Picker',
      template: SRC('docs/index.html')
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    contentBase: DOCS(),
    port: 8000,
    stats: 'minimal'
  }
}
