(function (angular) {
    'use strict';

    function HomeController(ExhibitService) {
        var vm;

        vm = this;

        // DocentService.getAll().then(function (data) {
        //     vm.docents = data;
        // });

        ExhibitService.getAll().then(function (data) {
            vm.exhibits = data.value;
        });

    }

    HomeController.$inject = [
        'ExhibitService'
    ];

    angular.module('sky-beacons')
        .controller('HomeController', HomeController);
}(window.angular));
