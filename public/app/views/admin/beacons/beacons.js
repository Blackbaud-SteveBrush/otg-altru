(function (angular) {
    'use strict';

    function BeaconsListController($state, BeaconService) {
        var self = this,
            beacons;

        BeaconService.getAll().then(function(data) {
            self.beacons = data.value;
        });

        self.goToEdit = function (beacon) {
            switch (beacon.beaconType) {
            case 'docent':
                $state.go('admin.forms.docent', { id: beacon._id });
                break;
            case 'exhibit':
                $state.go('admin.forms.exhibit', { id: beacon._id });
                break;
            }
        };
    }

    BeaconsListController.$inject = [
        '$state',
        'BeaconService'
    ];

    angular.module('sky-beacons')
        .controller('BeaconsListController', BeaconsListController);
}(window.angular));
