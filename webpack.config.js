const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./config');
function assetsPath(_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
    entry: __dirname+'/app/main.js',
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: __dirname + '/public/',
        historyApiFallback: true,
        inline: true,
        port: '8090'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },{
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },{
                        loader: 'css-loader',
                        options: {
                            // modules: true,  // true css模块化 命名空间
                            modules: false    // false 按原来的样式
                        }
                    },{
                        loader: 'postcss-loader'
                    }
                ]
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
        new CleanWebpackPlugin(['public'],{
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html"  //new 一个这个插件的实例，并传入相关的参数
        })
    ]
}