(function (angular) {
    'use strict';

    function ConfigRoutes($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .when('', '/')
            .otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../public/app/views/home/home.html',
                controller: 'HomeController as homeCtrl'
            })
            .state('exhibits', {
                url: '/exhibits',
                templateUrl: '../public/app/views/exhibits/exhibits.html',
                controller: 'ExhibitsController as exhibitsCtrl'
            })
            .state('exhibit', {
                url: '/exhibits/:slug',
                templateUrl: '../public/app/views/exhibit/exhibit.html',
                controller: 'ExhibitController as exhibitCtrl'
            });
    }

    ConfigRoutes.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    angular.module('sky-beacons', [
        'ui.router',
        'sky-beacons.templates'
    ])
        .config(ConfigRoutes);
}(window.angular));
