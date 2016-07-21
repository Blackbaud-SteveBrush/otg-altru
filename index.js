(function () {
    'use strict';

    var app,
        bodyParser,
        cookieParser,
        Database,
        database,
        environment,
        express,
        favicon,
        fs,
        handlebars,
        http,
        mongoose,
        path,
        port,
        routes,
        schedule,
        server,
        session;

    fs = require('fs');
    express = require('express');
    favicon = require('serve-favicon');
    cookieParser = require('cookie-parser');
    bodyParser = require('body-parser');
    mongoose = require('mongoose');
    Database = require('./server/database/classes/Database');
    routes = require('./server/routes');
    handlebars  = require('express-handlebars');
    session = require('express-session');
    path = require('path');
    http = require('http');

    port = process.env.PORT || '3000';
    environment = process.env.NODE_ENV || 'development';
    database = new Database({
        databaseUri: process.env.DATABASE_URI || 'mongodb://localhost:27017/sky-beacons',
        service: mongoose
    });

    app = express();

    app.set('views', path.join(__dirname, 'server', 'views'));
    app.set('view engine', 'handlebars');
    app.engine('handlebars', handlebars({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'server', 'views', 'layouts')
    }));

    app.use(bodyParser.json());
    app.use(session({
        secret: '1234567890QWERTY',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));
    app.use(favicon(__dirname + '/build/images/favicon.ico'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/', routes.index);

    // Docents
    app.delete('/api/docents/:id', routes.api.docent.deleteDocent);
    app.get('/api/docents/:id',
        routes.api.docent.addVisit,
        routes.api.docent.getDocent
    );
    app.get('/api/docents', routes.api.docent.getDocents);
    app.post('/api/docents', routes.api.docent.postDocent);
    app.put('/api/docents/:id', routes.api.docent.putDocent);

    // Exhibits
    app.delete('/api/exhibits/:id', routes.api.exhibit.deleteExhibit);
    app.get('/api/exhibits/:id',
        routes.api.exhibit.addVisit,
        routes.api.exhibit.getExhibit
    );
    app.get('/api/exhibits', routes.api.exhibit.getExhibits);
    app.post('/api/exhibits', routes.api.exhibit.postExhibit);
    app.put('/api/exhibits/:id', routes.api.exhibit.putExhibit);

    // Catch 404 and forward to error handler
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

    database.connect(function () {
        console.log("Database connected.");
    });
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port, function () {
        console.log('Node app is running on port', app.get('port'));
    });
}());
