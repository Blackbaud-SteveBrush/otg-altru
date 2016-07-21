(function (angular) {
    'use strict';

    function ExhibitService($http, $q) {
        var service;

        service = this;

        service.getAll = function () {
            return $http.get('/api/exhibits/').then(function (res) {
                return res.data;
            });
        };

        service.getById = function (id) {
            return $http.get('/api/exhibits/' + id).then(function (res) {
                return res.data;
            });
        };

        service.deleteById = function (id) {
            var deferred;
            deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: '/api/exhibits/' + id,
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function (res) {
                deferred.resolve(res.data);
            });
            
            return deferred.promise;
        };
    }

    ExhibitService.$inject = [
        '$http',
        '$q'
    ];

    angular.module('sky-beacons')
        .service('ExhibitService', ExhibitService);

}(window.angular))