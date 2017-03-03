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
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=[name].[ext]&publicPath=dist/&outputPath=/'
      }
    ]
  },
    plugins: [
        new CopyWebPack([
            {from: 'src/images/', to:"images/"}
        ])
    ]
}