(function (angular) {
    'use strict';

    function DocentService($http, $q) {
        var service;

        service = this;

        service.getAll = function () {
            return $http.get('/api/docents/').then(function (res) {
                return res.data;
            });
        };

        service.getById = function (id) {
            return $http.get('/api/docents/' + id).then(function (res) {
                return res.data;
            });
        };

        service.deleteById = function (id) {
            var deferred;
            deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: '/api/docents/' + id,
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function (res) {
                deferred.resolve(res.data);
            });

            return deferred.promise;
        };

        service.add = function (data) {
            var deferred = $q.defer();

            $http.post('/api/docents/', {
                data : data,
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (res) {
                if (res.data.error) {
                    deferred.resolve(res.data);
                } else {
                    deferred.resolve(res.data);
                }
            });

            return deferred.promise;
        };

        service.edit = function (data) {
            var deferred;
            deferred = $q.defer();

            $http.put('/api/docents/' + data._id, {
                data: data
            }).then(function (res) {
                if (res.data.error) {
                    deferred.resolve(res.data);
                } else {
                    deferred.resolve(res.data);
                }
            });

            return deferred.promise;
        };
    }

    DocentService.$inject = [
        '$http',
        '$q'
    ];

    angular.module('sky-beacons')
        .service('DocentService', DocentService);

}(window.angular));
