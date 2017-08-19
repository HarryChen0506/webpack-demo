// run dev-server  
process.env.NODE_ENV = "development";
var path = require('path');
var webpack = require('webpack');
var express = require('express');
var opn = require('opn')
//var rimraf = require('rimraf');


var webpackConfig = require('./webpack.config.js');
var config = require('../config');
var port = process.env.PORT || config.dev.port;
var autoOpenBrowser = !!config.dev.autoOpenBrowser;


console.log('run dev-server')
var app = express();
var compiler = webpack(webpackConfig, (err, status)=>{
     if (err) throw err;     
});


var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
    path: "/__what",
    heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
         opn(uri)
    }
    _resolve()
})

var server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}