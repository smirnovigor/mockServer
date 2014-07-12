var express = require('express');
var config = require('./config');
var middleware = require('./middleware');
var path = require('path');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

module.exports = function(){

    var app = express();

    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }

    app.set('port', config.port);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(middleware.allowCrossDomain);
    app.use(middleware.delayResponse(config.delay));
    app.use(favicon(path.join(GLOBAL.root, 'public', 'images', 'favicon.ico')));
    app.use(express.static(path.join(GLOBAL.root, 'public')));
//    app.use(app.router);
    app.settings.etag = config.etag;

    return app;
};
