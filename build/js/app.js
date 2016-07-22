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
                url: '/exhibits/:id',
                templateUrl: '../public/app/views/exhibit/exhibit.html',
                controller: 'ExhibitController as exhibitCtrl'
            })
            .state('docent', {
                url: '/docents/:id',
                templateUrl: '../public/app/views/docent/docent.html',
                controller: 'DocentController as docentCtrl'
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
                url: '/exhibits/:id',
                templateUrl: '../public/app/views/admin/exhibits/exhibits.html',
                controller: 'ExhibitsListController as exhibitsCtrl'
            })
            .state('admin.forms', {
                abstract: true,
                url: '/forms',
                template: '<ui-view />'
            })
            .state('admin.forms.docent', {
                url: '/docent/:id',
                templateUrl: '../public/app/views/admin/forms/docent/docent.html',
                controller: 'DocentFormController as formCtrl'
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

    function BeaconService($http) {
        var service;

        service = this;

        service.getAll = function () {
            return $http.get('/api/beacons/').then(function (res) {
                return res.data;
            });
        };
    }

    BeaconService.$inject = [
        '$http',
    ];

    angular.module('sky-beacons')
        .service('BeaconService', BeaconService);

}(window.angular));

(function (angular) {
    'use strict';

    function DocentService($http, $q) {
        var service;

        service = this;

        service.getAll = function () {
            return $http.get('/api/docents/').then(function (res) {
                return res.data;
            });
        };

        service.getById = function (id) {
            return $http.get('/api/docents/' + id).then(function (res) {
                return res.data;
            });
        };

        service.deleteById = function (id) {
            var deferred;
            deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: '/api/docents/' + id,
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function (res) {
                deferred.resolve(res.data);
            });

            return deferred.promise;
        };

        service.add = function (data) {
            var deferred = $q.defer();

            $http.post('/api/docents/', {
                data : data,
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (res) {
                if (res.data.error) {
                    deferred.resolve(res.data);
                } else {
                    deferred.resolve(res.data);
                }
            });

            return deferred.promise;
        };

        service.edit = function (data) {
            var deferred;
            deferred = $q.defer();

            $http.put('/api/docents/' + data._id, {
                data: data
            }).then(function (res) {
                if (res.data.error) {
                    deferred.resolve(res.data);
                } else {
                    deferred.resolve(res.data);
                }
            });

            return deferred.promise;
        };
    }

    DocentService.$inject = [
        '$http',
        '$q'
    ];

    angular.module('sky-beacons')
        .service('DocentService', DocentService);

}(window.angular));

(function (angular) {
    'use strict';

    function ExhibitService($http, $q) {
        var service;

        service = this;

        service.getAll = function () {
            return $http.get('/api/exhibits/').then(function (res) {
                return res.data;
            });
        };

        service.getById = function (id) {
            return $http.get('/api/exhibits/' + id).then(function (res) {
                return res.data;
            });
        };

        service.deleteById = function (id) {
            var deferred;
            deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: '/api/exhibits/' + id,
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function (res) {
                deferred.resolve(res.data);
            });

            return deferred.promise;
        };

        service.add = function (data) {
            var deferred = $q.defer();

            $http.post('/api/exhibits/', {
                data : data,
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (res) {
                if (res.data.error) {
                    deferred.resolve(res.data);
                } else {
                    deferred.resolve(res.data);
                }
            });

            return deferred.promise;
        };

        service.edit = function (data) {
            var deferred;
            deferred = $q.defer();

            $http.put('/api/exhibits/' + data._id, {
                data: data
            }).then(function (res) {
                if (res.data.error) {
                    deferred.resolve(res.data);
                } else {
                    deferred.resolve(res.data);
                }
            });

            return deferred.promise;
        };
    }

    ExhibitService.$inject = [
        '$http',
        '$q'
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

(function (angular) {
    'use strict';

    function ExhibitsListController() {}

    angular.module('sky-beacons')
        .controller('ExhibitsListController', ExhibitsListController);
}(window.angular));

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
                    if (data.success) {
                        vm.success = 'Docent successfully updated.';
                        vm.formData = data;
                    } else {
                        processError(data);
                    }
                    vm.scrollToTop = true;
                });
            } else {
                DocentService.add(vm.formData).then(function (data) {
                    if (data.success) {
                        vm.success = 'Docent successfully created.';
                        vm.formData = data;
                    } else {
                        processError(data);
                    }
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

(function (angular) {
    'use strict';

    function DocentController(DocentService, $stateParams) {
        var vm;

        vm = this;

        DocentService.getById($stateParams.id).then(function (data) {
            vm.docent = data;
        });
    }

    DocentController.$inject = [
        'DocentService',
        '$stateParams'
    ];

    angular.module('sky-beacons')
        .controller('DocentController', DocentController);
}(window.angular));

(function (angular) {
    'use strict';

    function ExhibitController(ExhibitService, $stateParams) {
        var vm;

        vm = this;

        ExhibitService.getById($stateParams.id).then(function (data) {
            vm.exhibit = data;
        });
    }

    ExhibitController.$inject = [
        'ExhibitService',
        '$stateParams'
    ];

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

angular.module('sky-beacons.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('../public/app/views/admin/beacons/beacons.html',
        '<div><bb-carousel bb-carousel-style=card-large><bb-carousel-item ng-repeat="beacon in beaconsCtrl.beacons"><bb-card bb-card-size=large><bb-card-title>{{beacon.name}}</bb-card-title><bb-card-content><div class=bb-emphasized>ID</div>{{beacon.UID}}<div class=bb-emphasized style="margin-top: 10px">Type</div>{{beacon.beaconType}}<div class=bb-emphasized style="margin-top: 10px">Description</div>{{beacon.description}}</bb-card-content><bb-card-actions><button type=button class="btn btn-primary" ui-sref=admin.exhibits({id:beacon._id})>More information</button> <button type=button class="btn btn-default" ng-click=beaconsCtrl.goToEdit(beacon)>Edit</button></bb-card-actions></bb-card></bb-carousel-item></bb-carousel></div>');
    $templateCache.put('../public/app/views/admin/exhibits/exhibits.html',
        'Hello, World!');
    $templateCache.put('../public/app/views/admin/forms/docent/docent.html',
        '<div class=container ng-if=::formCtrl.isReady><div class=page-header bb-scroll-into-view=formCtrl.scrollToTop><h1 ng-if=formCtrl.formData._id>Edit {{ formCtrl.formData.name }}</h1><h1 ng-if=!formCtrl.formData._id>Add Docent</h1></div><div ng-if=formCtrl.success class="alert alert-success" ng-bind-html=formCtrl.trustHtml(formCtrl.success)></div><div ng-if=formCtrl.error class="alert alert-danger"><p ng-bind-html=formCtrl.trustHtml(formCtrl.error)></p></div><form name=docentForm class=form-horizontal ng-submit=formCtrl.submit() novalidate><div class=row><div class=col-sm-10><ul class="nav nav-tabs"><li role=presentation class=active><a href=#tab-details target=_self data-toggle=tab>Details</a></li><li role=presentation><a href=#tab-pieces target=_self data-toggle=tab>Pieces</a></li></ul><div class=tab-content><div class="tab-pane active" id=tab-details><div class=form-group><label class="col-sm-2 control-label">Name:</label><div class=col-sm-10><input class=form-control name=name ng-model=formCtrl.formData.name></div></div><div class=form-group><label class="col-sm-2 control-label">Beacon UID:</label><div class=col-sm-10><input class=form-control name=UID ng-model=formCtrl.formData.UID></div></div><div class=form-group><label class="col-sm-2 control-label">Title:</label><div class=col-sm-10><input class=form-control name=title ng-model=formCtrl.formData.title></div></div><div class=form-group><label class="col-sm-2 control-label">Bio:</label><div class=col-sm-10><textarea class=form-control name=description ng-model=formCtrl.formData.description></textarea></div></div></div><div class="tab-pane active" id=tab-pieces></div></div></div><div class=col-sm-2><button ng-if=formCtrl.formData._id class="btn btn-primary btn-lg btn-block" type=submit ng-disabled=docentForm.$invalid><i class="fa fa-save"></i>Save</button> <button ng-if=!formCtrl.formData._id class="btn btn-primary btn-lg btn-block" type=submit ng-disabled=docentForm.$invalid><i class="fa fa-plus"></i>Create</button> <button ng-if=formCtrl.formData._id class="btn btn-danger btn-block" type=button cc-confirm-click data-confirmed-click=formCtrl.delete()><i class="fa fa-trash"></i>Delete</button></div></div></form><pre>{{ formCtrl.formData | json }}</pre></div>');
    $templateCache.put('../public/app/views/admin/forms/exhibit/exhibit.html',
        '<div class=container ng-if=::formCtrl.isReady><div class=page-header bb-scroll-into-view=formCtrl.scrollToTop><h1 ng-if=formCtrl.formData._id>Edit {{ formCtrl.formData.name }}</h1><h1 ng-if=!formCtrl.formData._id>Add Exhibit</h1></div><div ng-if=formCtrl.success class="alert alert-success" ng-bind-html=formCtrl.trustHtml(formCtrl.success)></div><div ng-if=formCtrl.error class="alert alert-danger"><p ng-bind-html=formCtrl.trustHtml(formCtrl.error)></p></div><form name=exhibitForm class=form-horizontal ng-submit=formCtrl.submit() novalidate><div class=row><div class=col-sm-10><ul class="nav nav-tabs"><li role=presentation class=active><a href=#tab-details target=_self data-toggle=tab>Details</a></li><li role=presentation><a href=#tab-pieces target=_self data-toggle=tab>Pieces</a></li></ul><div class=tab-content><div class="tab-pane active" id=tab-details><div class=form-group><label class="col-sm-2 control-label">Name:</label><div class=col-sm-10><input class=form-control name=name ng-model=formCtrl.formData.name></div></div><div class=form-group><label class="col-sm-2 control-label">Beacon UID:</label><div class=col-sm-10><input class=form-control name=UID ng-model=formCtrl.formData.UID></div></div><div class=form-group><label class="col-sm-2 control-label">Image URL:</label><div class=col-sm-10><input class=form-control name=image ng-model=formCtrl.formData.image></div></div><div class=form-group><label class="col-sm-2 control-label">Description:</label><div class=col-sm-10><textarea class=form-control name=description ng-model=formCtrl.formData.description></textarea></div></div></div><div class="tab-pane active" id=tab-pieces><div class=form-group><label class="col-sm-2 control-label">Pieces:</label><div class=col-sm-10><div ng-repeat="piece in formCtrl.formData.pieces" class=form-group-list-item><div class=row><div class=col-sm-10><div class=row><div class=col-sm-6><div class=form-group><label>Name:</label><input class=form-control ng-model=piece.name></div></div><div class=col-sm-6><div class=form-group><label>Description:</label><textarea class=form-control type=text ng-model=piece.description></textarea></div></div></div><div class=row><div class=col-sm-6><div class=form-group><label>Full URL:</label><input class=form-control ng-model=piece.link placeholder="http://"></div></div><div class=col-sm-6><div class=form-group><label>Image URL:</label><input class=form-control ng-model=piece.image placeholder="http://"></div></div></div></div><div class=col-sm-2><div class=form-group><label>&nbsp;</label><button type=button class="btn btn-default btn-sm btn-block" ng-click=formCtrl.removePiece($index)><i class="fa fa-minus"></i>Remove</button></div></div></div></div><button type=button class="btn btn-link" ng-click=formCtrl.addPiece()><i class="fa fa-plus"></i> Add Piece</button></div></div></div></div></div><div class=col-sm-2><button ng-if=formCtrl.formData._id class="btn btn-primary btn-lg btn-block" type=submit ng-disabled=exhibitForm.$invalid><i class="fa fa-save"></i>Save</button> <button ng-if=!formCtrl.formData._id class="btn btn-primary btn-lg btn-block" type=submit ng-disabled=exhibitForm.$invalid><i class="fa fa-plus"></i>Create</button> <button ng-if=formCtrl.formData._id class="btn btn-danger btn-block" type=button cc-confirm-click data-confirmed-click=formCtrl.delete()><i class="fa fa-trash"></i>Delete</button></div></div></form><pre>{{ formCtrl.formData | json }}</pre></div>');
    $templateCache.put('../public/app/views/docent/docent.html',
        '<section class="section container"><h1 class=page-header>{{:: docentCtrl.docent.name }}</h1><img class="ex-image img-responsive" src="{{:: docentCtrl.docent.image }}"><p class=ex-description>{{:: docentCtrl.docent.description }}</p></section>');
    $templateCache.put('../public/app/views/exhibit/exhibit.html',
        '<section class="section container"><h1 class=page-header>{{:: exhibitCtrl.exhibit.name }}</h1><img class="ex-image img-responsive" ng-src="{{:: exhibitCtrl.exhibit.image }}"><p class=ex-description>{{:: exhibitCtrl.exhibit.description }}</p></section><section class=container><h2>Pieces in this exhibit</h2><div class=media ng-repeat="piece in exhibitCtrl.exhibit.pieces"><div class=media-left><a href=#><img class=media-object src={{piece.image}} alt=""></a></div><div class=media-body><h4 class=media-heading>{{piece.name}}</h4><p>{{piece.description}}</p><p><a href={{piece.link}}>Read more</a></p></div></div></section>');
    $templateCache.put('../public/app/views/exhibits/exhibits.html',
        'Hello, World!');
    $templateCache.put('../public/app/views/home/home.html',
        '<section class="section home section-primary"><header class=container><h1>Sky Beacons</h1></header></section><div class=container><div class=row><div class=col-md-12><h2 class=home-subhead>Exhibits</h2></div><div ng-repeat="exhibit in homeCtrl.exhibits" class=col-md-4><div class="panel panel-default"><div class=panel-heading><h3 class="bb-section-heading panel-title">{{:: exhibit.name }}</h3></div><div class=panel-body><img class=img-responsive ng-src="{{:: exhibit.image }}"> <button class="btn btn-primary pull-right" ui-sref="exhibit({id: exhibit._id})">View</button></div></div></div></div><div class=row><div class=col-md-12><h2 class=home-subhead>Docents</h2></div><div ng-repeat="docent in homeCtrl.docents" class=col-md-4><div class="panel panel-default"><div class=panel-heading><h3 class="bb-section-heading panel-title">{{:: docent.name }}</h3></div><div class=panel-body><img class=img-responsive ng-src="{{:: docent.image }}"> <button class="btn btn-primary pull-right" ui-sref="docent({id: docent._id})">View</button></div></div></div></div></div>');
}]);

//# sourceMappingURL=app.js.map