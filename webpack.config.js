const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
                            modules: true
                        }
                    },{
                        loader: 'postcss-loader'
                    }
                ]
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