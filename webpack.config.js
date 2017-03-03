const webpack = require('webpack');
var CopyWebPack = require('copy-webpack-plugin');

module.exports = {
    entry: {app: './src/js/main.js', static: './src/js/static.js' },
    output: {
        path: './dist',
        filename: '[name].bundle.js'
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
        },
        {
                test: /\.vue$/,
                loader: 'vue-loader',
        }
        ]
    },
    plugins: [
        new CopyWebPack([
            {from: 'src/images/', to:"images/"}
        ])
    ],
    resolve: {
        alias: {
        'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    }
}