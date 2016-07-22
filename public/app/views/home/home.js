(function (angular) {
    'use strict';

    function HomeController(DocentService, ExhibitService) {
        var vm;

        vm = this;

        DocentService.getAll().then(function (data) {
            vm.docents = data.value;
        });

        ExhibitService.getAll().then(function (data) {
            vm.exhibits = data.value;
        });

    }

    HomeController.$inject = [
        'DocentService',
        'ExhibitService'
    ];

    angular.module('sky-beacons')
        .controller('HomeController', HomeController);
}(window.angular));
