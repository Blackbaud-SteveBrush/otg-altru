(function (angular) {
    'use strict';

    function ExhibitFormController($state, ExhibitService) {
        var vm;
        vm = this;
        vm.formData = {
            beaconType: 'exhibit'
        };

        if ($state.params.id) {
            ExhibitService.getById($state.params.capabilityId).then(function (data) {
                vm.formData = data.capability;
                vm.isReady = true;
            });
        } else {
            vm.isReady = true;
        }

        vm.submit = function () {
            vm.error = false;
            vm.success = false;
            vm.scrollToTop = false;

            if (vm.formData._id) {
                ExhibitService.update(vm.formData).then(function (data) {
                    if (data.success) {
                        vm.success = 'Exhibit successfully updated.';
                        vm.formData = data;
                    } else {
                        processError(data);
                    }
                    vm.scrollToTop = true;
                });
            } else {
                ExhibitService.create(vm.formData).then(function (data) {
                    if (data.success) {
                        vm.success = 'Exhibit successfully created.';
                        vm.formData = data;
                    } else {
                        processError(data);
                    }
                    vm.scrollToTop = true;
                });
            }
        };
    }

    ExhibitFormController.$inject = [
        '$state',
        'ExhibitService'
    ];

    angular.module('sky-beacons')
        .controller('ExhibitFormController', ExhibitFormController);
}(window.angular));
