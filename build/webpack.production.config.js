const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('../config');

function assetsPath(_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
    entry: path.join(__dirname,'../app/main.js'),
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production'
                    ? config.build.assetsPublicPath
                    : config.dev.assetsPublicPath,        
        filename: assetsPath('bundle-[hash].js'),   //utils.assetsPath('js/[name].[chunkhash].js')
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },{
                test: /\.css$/,
                // use: [
                //     {
                //         loader: "style-loader"
                //     },{
                //         loader: 'css-loader',
                //         options: {
                //             modules: false
                //         }
                //     },{
                //         loader: 'postcss-loader'
                //     }
                // ]
                use: ExtractTextPlugin.extract({
                    use:[{
                        loader: 'css-loader',
                        options: {
                            modules: false,
                        }                            
                    },{
                        loader: 'postcss-loader'
                    }],
                    fallback: 'style-loader',
                })
            },{
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),
        new CleanWebpackPlugin(['dist'],{
            root: path.join(__dirname,"../"),
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname ,"../index.html")  //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({
            filename: assetsPath('css/[name].[contenthash].css')
        }),    
    ]
}