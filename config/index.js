
// config  dev和production环境 相关的配置参数

var path = require('path');

module.exports = {
    dev: {
        assetsRoot: path.resolve(__dirname, '../public/'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        port: '8090',
        autoOpenBrowser: true
    },
    build: {
        assetsRoot: path.resolve(__dirname, '../dist/'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
    }
}