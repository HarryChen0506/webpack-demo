const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname+'/app/main.js',
    output: {
        path: __dirname + '/public/',
        filename: 'bundle-[hash].js'
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: __dirname + '/public/',
        historyApiFallback: true,
        inline: true,
        port: '8091'
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
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html"  //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css")
    ]
}