(function (angular) {
    'use strict';

    function HomeController(ExhibitService) {
        var vm;

        vm = this;

        vm.isReady = true;

        // DocentService.getAll().then(function (data) {
        //     vm.docents = data;
        // });

        console.log('exhibit', ExhibitService);

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
