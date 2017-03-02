const webpack = require('webpack');
var CopyWebPack = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: './dist',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      },
      {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
      },
      {
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
          test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader : 'file-loader'
      }
    ]
  },
    plugins: [
        new CopyWebPack([
            {from: 'src/images/', to:"images/"},
            {from:'node_modules/font-awesome/fonts', to:'./fonts'},
            {from:'index.html', to:'index.html'}
        ])
    ]
}