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

        $stateProvider
            .state('admin', {
                abstract: true,
                url: '/admin',
                template: '<ui-view />'
            })
            .state('admin.beacons', {
                url: '/beacons',
                templateUrl: '../public/app/views/admin/beacons/beacons.html',
                controller: 'BeaconsListController as beaconsCtrl'
            })
            .state('admin.exhibits', {
                url: '/exhibits/:slug',
                templateUrl: '../public/app/views/admin/exhibits/exhibits.html',
                controller: 'ExhibitsListController as exhibitsCtrl'
            })
            .state('admin.forms', {
                abstract: true,
                url: '/forms',
                template: '<ui-view />'
            })
            .state('admin.forms.exhibit', {
                url: '/exhibit/:id',
                templateUrl: '../public/app/views/admin/forms/exhibit/exhibit.html',
                controller: 'ExhibitFormController as formCtrl'
            });
    }

    ConfigRoutes.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    angular.module('sky-beacons', [
        'ui.router',
        'sky',
        'ui.bootstrap',
        'sky-beacons.templates'
    ])
        .config(ConfigRoutes);
}(window.angular));
