// build webpack
process.env.NODE_ENV = "production";
var path = require('path');
var webpack = require('webpack');
var rimraf = require('rimraf');

var webpackConfig = require('./webpack.production.config.js');

console.log('build new')
webpack(webpackConfig,(err, status)=>{
     if (err) throw err;     
})