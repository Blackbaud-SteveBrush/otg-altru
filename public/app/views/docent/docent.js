(function (angular) {
    'use strict';

    function DocentController(DocentService, $stateParams) {
        var vm;

        vm = this;

        DocentService.getById($stateParams.id).then(function (data) {
            vm.docent = data;
        });
    }

    DocentController.$inject = [
        'DocentService',
        '$stateParams'
    ];

    angular.module('sky-beacons')
        .controller('DocentController', DocentController);
}(window.angular));
