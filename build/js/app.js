(function (angular) {
    'use strict';

    function ConfigRoutes($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .when('', '/')
            .otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../public/app/views/home/home.html',
                controller: 'HomeController as homeCtrl'
            })
            .state('exhibits', {
                url: '/exhibits',
                templateUrl: '../public/app/views/exhibits/exhibits.html',
                controller: 'ExhibitsController as exhibitsCtrl'
            })
            .state('exhibit', {
                url: '/exhibits/:slug',
                templateUrl: '../public/app/views/exhibit/exhibit.html',
                controller: 'ExhibitController as exhibitCtrl'
            });

        $stateProvider
            .state('admin', {
                abstract: true,
                url: '/admin',
                template: '<ui-view />'
            })
            .state('admin.beacons', {
                url: '/beacons',
                templateUrl: '../public/app/views/admin/beacons/beacons.html',
                controller: 'BeaconsListController as beaconsCtrl'
            })
            .state('admin.exhibits', {
                url: '/exhibits/:slug',
                templateUrl: '../public/app/views/admin/exhibits/exhibits.html',
                controller: 'ExhibitsListController as exhibitsCtrl'
            })
            .state('admin.forms', {
                abstract: true,
                url: '/forms',
                template: '<ui-view />'
            })
            .state('admin.forms.exhibit', {
                url: '/exhibit/:id',
                templateUrl: '../public/app/views/admin/forms/exhibit/exhibit.html',
                controller: 'ExhibitFormController as formCtrl'
            });
    }

    ConfigRoutes.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    angular.module('sky-beacons', [
        'ui.router',
        'sky',
        'ui.bootstrap',
        'sky-beacons.templates'
    ])
        .config(ConfigRoutes);
}(window.angular));

(function (angular) {
    'use strict';

    function ExhibitService($http) {
        var service;
        service = this;
        service.findById = function (id) {
            return $http.get('/api/exhibits/' + id);
        };
    }

    ExhibitService.$inject = [
        '$http'
    ];

    angular.module('sky-beacons')
        .service('ExhibitService', ExhibitService);
}(window.angular));

(function (window, angular) {
    'use strict';

    function ccConfirmClick() {
        return {
            link: function (scope, element, attr) {
                var clickAction,
                    message;

                message = attr.ccConfirmClick || "Are you sure?";
                clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(message)) {
                        scope.$eval(clickAction);
                    }
                });
            }
        };
    }

    angular.module('sky-beacons')
        .directive('ccConfirmClick', ccConfirmClick);
}(window, window.angular));

(function (angular) {
    'use strict';

    function BeaconsListController() 
    {
        var self = this;

        self.beacons = [
            {
                UID: 'asdflkasjdflujaiojzxcv',
                name: "Beacon 1",
                type: "exhibit",
                description: "This beacon does stuff.",
                slug: "hihihi"
            },
            {
                UID: 'asdflkas33jdflujaiojzxcv',
                name: "Beacon 2",
                type: "exhibit",
                description: "This beacon does stuff. asdfkjasdfklj",
                slug: "hihihi2"
            },
            {
                UID: 'asdflkas222jdflujaiojzxcv',
                name: "Beacon 3",
                type: "exhibit",
                description: "This beacon does stuff. ewggerwqqwer",
                slug: "hihihi3"
            },
            {
                UID: 'asdfl111kasjdflujaiojzxcv',
                name: "Beacon 4",
                type: "exhibit",
                description: "This beacon does stuff. asdf asdf df",
                slug: "hihihi4"
            }
        ]
    }

    angular.module('sky-beacons')
        .controller('BeaconsListController', BeaconsListController);
}(window.angular));
(function (angular) {
    'use strict';

    function ExhibitsListController() {}

    angular.module('sky-beacons')
        .controller('ExhibitsListController', ExhibitsListController);
}(window.angular));

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

(function (angular) {
    'use strict';

    function ExhibitController() {}

    angular.module('sky-beacons')
        .controller('ExhibitController', ExhibitController);
}(window.angular));

(function (angular) {
    'use strict';

    function ExhibitsController() {}

    angular.module('sky-beacons')
        .controller('ExhibitsController', ExhibitsController);
}(window.angular));

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

angular.module('sky-beacons.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('../public/app/views/admin/beacons/beacons.html',
        '<div><bb-carousel bb-carousel-style=card-large><bb-carousel-item ng-repeat="beacon in beaconsCtrl.beacons"><bb-card bb-card-size=large><bb-card-title>{{beacon.name}}</bb-card-title><bb-card-content><div class=bb-emphasized>ID</div>{{beacon.UID}}<div class=bb-emphasized style="margin-top: 10px">Type</div>{{beacon.type}}<div class=bb-emphasized style="margin-top: 10px">Description</div>{{beacon.description}}</bb-card-content><bb-card-actions><button type=button class="btn btn-default" ui-sref=admin.exhibits({slug:beacon.slug})>More information</button> <button type=button class="btn btn-primary" style="background-color: #C61C1C;border-color: #A71818">Delete</button></bb-card-actions></bb-card></bb-carousel-item></bb-carousel></div>');
    $templateCache.put('../public/app/views/admin/exhibits/exhibits.html',
        'Hello, World!');
    $templateCache.put('../public/app/views/admin/forms/exhibit/exhibit.html',
        '<div class=container ng-if=::formCtrl.isReady><div class=page-header bb-scroll-into-view=formCtrl.scrollToTop><h1 ng-if=formCtrl.formData._id>Edit {{ formCtrl.formData.name }}</h1><h1 ng-if=!formCtrl.formData._id>Add Exhibit</h1></div><div ng-if=formCtrl.success class="alert alert-success" ng-bind-html=formCtrl.trustHtml(formCtrl.success)></div><div ng-if=formCtrl.error class="alert alert-danger"><p ng-bind-html=formCtrl.trustHtml(formCtrl.error)></p></div><form name=exhibitForm class=form-horizontal ng-submit=formCtrl.submit() novalidate><div class=row><div class=col-sm-10><ul class="nav nav-tabs"><li role=presentation class=active><a href=#tab-details target=_self data-toggle=tab>Details</a></li><li role=presentation><a href=#tab-pieces target=_self data-toggle=tab>Pieces</a></li></ul><div class=tab-content><div class="tab-pane active" id=tab-details><div class=form-group><label class="col-sm-2 control-label">Name:</label><div class=col-sm-10><input class=form-control name=name ng-model=formCtrl.formData.name></div></div><div class=form-group><label class="col-sm-2 control-label">Beacon UID:</label><div class=col-sm-10><input class=form-control name=UID ng-model=formCtrl.formData.UID></div></div><div class=form-group><label class="col-sm-2 control-label">Description:</label><div class=col-sm-10><textarea class=form-control name=description ng-model=formCtrl.formData.description></textarea></div></div></div><div class="tab-pane active" id=tab-pieces></div></div></div><div class=col-sm-2><button ng-if=formCtrl.formData._id class="btn btn-primary btn-lg btn-block" type=submit ng-disabled=exhibitForm.$invalid><i class="fa fa-save"></i>Save</button> <button ng-if=!formCtrl.formData._id class="btn btn-primary btn-lg btn-block" type=submit ng-disabled=exhibitForm.$invalid><i class="fa fa-plus"></i>Create</button> <button ng-if=formCtrl.formData._id class="btn btn-danger btn-block" type=button cc-confirm-click data-confirmed-click=formCtrl.delete()><i class="fa fa-trash"></i>Delete</button></div></div></form><pre>{{ formCtrl.formData | json }}</pre></div>');
    $templateCache.put('../public/app/views/exhibit/exhibit.html',
        'Hello, World!');
    $templateCache.put('../public/app/views/exhibits/exhibits.html',
        'Hello, World!');
    $templateCache.put('../public/app/views/home/home.html',
        '<div class=container><div class=row><div class=col-md-12><h2>Exhibits</h2><div ng-repeat="exhibit in homeCtrl.exhibits" class="panel panel-default"><div class=panel-body><h3>{{:: exhibit.name }}</h3><img></div></div></div></div><div class=row><div class=col-md-12><h2>Docents</h2><div ng-repeat="docent in homeCtrl.docents" class="panel panel-default"><div class=panel-body><h3>{{:: docent.name }}</h3><img></div></div></div></div></div>');
}]);

//# sourceMappingURL=app.js.map