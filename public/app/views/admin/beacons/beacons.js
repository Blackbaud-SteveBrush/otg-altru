(function (angular) {
    'use strict';

    function BeaconsListController(BeaconService) 
    {
        var self = this,
            beacons;

        BeaconService.getAll().then(function(data) {
            self.beacons = data.value;    
        });
    }

    BeaconsListController.$inject = [
        'BeaconService'
    ];

    angular.module('sky-beacons')
        .controller('BeaconsListController', BeaconsListController);
}(window.angular));