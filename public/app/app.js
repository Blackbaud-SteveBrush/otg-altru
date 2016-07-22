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
                url: '/exhibits/:id',
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
            .state('admin.beaconPage', {
                url: '/beacons/:id',
                templateUrl: '../public/app/views/admin/beacon/beacon.html',
                controller: 'BeaconController as beaconCtrl'
            })
            .state('admin.analytics', {
                url: '/analytics',
                templateUrl: '../public/app/views/admin/analytics/analytics.html',
                controller: 'AnalyticsController as analyticsCtrl'
            })
            .state('admin.forms', {
                abstract: true,
                url: '/forms',
                template: '<ui-view />'
            })
            .state('admin.forms.docent', {
                url: '/docent/:id',
                templateUrl: '../public/app/views/admin/forms/docent/docent.html',
                controller: 'DocentFormController as formCtrl'
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
