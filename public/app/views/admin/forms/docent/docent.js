(function (angular) {
    'use strict';

    function DocentFormController($sce, $state, DocentService) {
        var processError,
            vm;

        vm = this;
        vm.formData = {
            beaconType: 'docent'
        };

        processError = function (data) {
            vm.error = data.error.message || data.error.errmsg;
            switch (data.error.code) {
                case 4:
                case 5:
                vm.needsLogin = true;
                break;
            }
        };

        if ($state.params.id) {
            DocentService.getById($state.params.id).then(function (data) {
                vm.formData = data;
                vm.isReady = true;
            });
        } else {
            vm.isReady = true;
        }

        vm.delete = function () {
            DocentService.deleteById(vm.formData._id).then(function (data) {
                if (data.success) {
                    $state.go('home');
                } else {
                    processError(data);
                }
            });
        };

        vm.submit = function () {
            vm.error = false;
            vm.success = false;
            vm.scrollToTop = false;
            if (vm.formData._id) {
                DocentService.edit(vm.formData).then(function (data) {
                    if (data.error) {
                        processError(data);
                    }
                    vm.success = 'Docent successfully updated.';
                    vm.formData = data;
                    vm.scrollToTop = true;
                });
            } else {
                DocentService.add(vm.formData).then(function (data) {
                    if (data.error) {
                        processError(data);
                    }
                    vm.success = 'Docent successfully created.';
                    vm.formData = data;
                    vm.scrollToTop = true;
                });
            }
        };

        vm.trustHtml = function (markup) {
            return $sce.trustAsHtml(markup);
        };
    }

    DocentFormController.$inject = [
        '$sce',
        '$state',
        'DocentService'
    ];

    angular.module('sky-beacons')
        .controller('DocentFormController', DocentFormController);
}(window.angular));
