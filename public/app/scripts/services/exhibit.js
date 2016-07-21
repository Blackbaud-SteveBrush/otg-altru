(function (angular) {
    'use strict';

    function ExhibitService($http) {
        var service;
        service = this;
        service.findById = function (id) {
            return $http.get('/api/exhibits/' + id);
        };
    }

    ExhibitService.$inject = [
        '$http'
    ];

    angular.module('sky-beacons')
        .service('ExhibitService', ExhibitService);
}(window.angular));
