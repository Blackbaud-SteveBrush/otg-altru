(function (angular) {
    'use strict';

    function ExhibitFormController($sce, $state, ExhibitService) {
        var processError,
            vm;

        vm = this;
        vm.formData = {
            beaconType: 'exhibit'
        };

        processError = function (data) {
            console.log(data);
            vm.error = data.error.message || data.error.errmsg;
            switch (data.error.code) {
                case 4:
                case 5:
                vm.needsLogin = true;
                break;
            }
        };

        if ($state.params.id) {
            ExhibitService.getById($state.params.id).then(function (data) {
                vm.formData = data;
                vm.isReady = true;
            });
        } else {
            vm.isReady = true;
        }

        vm.addPiece = function () {
            if (!vm.formData.pieces) {
                vm.formData.pieces = [];
            }
            vm.formData.pieces.push({});
        };

        vm.delete = function () {
            ExhibitService.deleteById(vm.formData._id).then(function (data) {
                if (data.success) {
                    $state.go('home');
                } else {
                    processError(data);
                }
            });
        };

        vm.removePiece = function (index) {
             vm.formData.pieces.splice(index, 1);
        };

        vm.submit = function () {
            vm.error = false;
            vm.success = false;
            vm.scrollToTop = false;
            if (vm.formData._id) {
                ExhibitService.edit(vm.formData).then(function (data) {
                    if (data.error) {
                        return processError(data);
                    }
                    vm.success = 'Exhibit successfully updated.';
                    vm.formData = data;
                    vm.scrollToTop = true;
                });
            } else {
                ExhibitService.add(vm.formData).then(function (data) {
                    if (data.error) {
                        return processError(data);
                    }
                    vm.success = 'Exhibit successfully created.';
                    vm.formData = data;
                    vm.scrollToTop = true;
                });
            }
        };

        vm.trustHtml = function (markup) {
            return $sce.trustAsHtml(markup);
        };
    }

    ExhibitFormController.$inject = [
        '$sce',
        '$state',
        'ExhibitService'
    ];

    angular.module('sky-beacons')
        .controller('ExhibitFormController', ExhibitFormController);
}(window.angular));
