module.exports = {
  entry: [
    "./client/index.js",
  ],
  output: {
    path: "public/static",
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      { test: /\.woff(\d*)\??(\d*)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf\??(\d*)$/,    loader: "file-loader" },
      { test: /\.eot\??(\d*)$/,    loader: "file-loader" },
      { test: /\.svg\??(\d*)$/,    loader: "file-loader" },
      { test: /\.scss$/, loader: "style!css!sass?sourceMap"},

    ]
  }
}
