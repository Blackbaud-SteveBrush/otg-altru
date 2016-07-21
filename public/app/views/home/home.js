(function (angular) {
    'use strict';

    function HomeController($state, ExhibitService, DocentService) {
        var vm;

        vm = this;

        vm.isReady = true;

    }

    angular.module('sky-beacons')
        .controller('HomeController', HomeController);
}(window.angular));
