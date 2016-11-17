var path = require("path")
var webpack = require("webpack")
var DefinePlugin = require('webpack/lib/DefinePlugin');

console.log(path.resolve(__dirname, './public/static'));
module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, "./client/index.js"),
  ],
  output: {
    path: '/',
    publicPath: '/static/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      { test: /\.woff(\d*)\??(\d*)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf\??(\d*)$/,    loader: "file-loader" },
      { test: /\.eot\??(\d*)$/,    loader: "file-loader" },
      { test: /\.svg\??(\d*)$/,    loader: "file-loader" },
      { test: /\.scss$/, loader: "style!css!sass?sourceMap"},

    ]
  },
  plugins: [

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
