const path = require('path')

module.exports = {
  context: __dirname,
  entry: './js/App.js',
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/public/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'js'),
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
          test: /\.scss$/,
          use: [{
              loader: "style-loader" 
          }, {
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }]
      }
    ]
  }
}
