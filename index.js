(function () {
    'use strict';

    var app,
        bodyParser,
        cookieParser,
        environment,
        express,
        handlebars,
        http,
        favicon,
        path,
        port,
        server;

    express = require('express');
    favicon = require('serve-favicon');
    cookieParser = require('cookie-parser');
    bodyParser = require('body-parser');
    handlebars  = require('express-handlebars');
    path = require('path');
    http = require('http');

    port = process.env.PORT || '3000';
    environment = process.env.NODE_ENV || 'development';

    app = express();

    app.set('views', path.join(__dirname, 'server', 'views'));
    app.set('view engine', 'handlebars');
    app.engine('handlebars', handlebars({
        defaultLayout: 'app',
        layoutsDir: path.join(__dirname, 'server', 'views', 'layouts')
    }));

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(favicon(__dirname + '/build/images/favicon.ico'));
    app.use(express.static(path.join(__dirname, 'build')));

    // Catch 404 and forward to error handler.
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // Development error handler
    if (environment === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    app.set('port', port);
    server = http.createServer(app);
    server.listen(port, function () {
        console.log('Node app is running on port', app.get('port'));
    });
}());
