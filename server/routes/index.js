(function () {
    'use strict';

    var routes;

    routes = {
        api: {}
    };

    routes.index = function (req, res, next) {
        res.render('home', {
            angularApp: 'sky-beacons',
            layout: 'app',
            title: 'Sky Beacons'
        });
    };

    routes.api = {
        exhibit: require(__dirname + '/api/exhibit.js')
    };

    module.exports = routes;
}());
