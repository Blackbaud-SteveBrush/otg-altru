(function (angular) {
    'use strict';

    function BeaconService($http) {
        var service;

        service = this;

        service.getAll = function () {
            return $http.get('/api/beacons/').then(function (res) {
                return res.data;
            });
        };
    }

    BeaconService.$inject = [
        '$http',
    ];

    angular.module('sky-beacons')
        .service('BeaconService', BeaconService);

}(window.angular));
