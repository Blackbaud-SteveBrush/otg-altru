(function (angular) {
    'use strict';

    function ExhibitController(ExhibitService, $stateParams) {
        var vm;

        vm = this;

        ExhibitService.getById($stateParams.id).then(function (data) {
            vm.exhibit = data;
        });
    }

    ExhibitController.$inject = [
        'ExhibitService',
        '$stateParams'
    ];

    angular.module('sky-beacons')
        .controller('ExhibitController', ExhibitController);
}(window.angular));
