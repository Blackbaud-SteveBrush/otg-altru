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
    $templateCache.put('../public/app/views/exhibit/exhibit.html',
        'Hello, World!');
    $templateCache.put('../public/app/views/exhibits/exhibits.html',
        'Hello, World!');
    $templateCache.put('../public/app/views/home/home.html',
        '<div class=container><div class=row><div class=col-md-12><h2>Exhibits</h2><div ng-repeat="exhibit in homeCtrl.exhibits" class="panel panel-default"><div class=panel-body><h3>{{:: exhibit.name }}</h3><img></div></div></div></div><div class=row><div class=col-md-12><h2>Docents</h2><div ng-repeat="docent in homeCtrl.docents" class="panel panel-default"><div class=panel-body><h3>{{:: docent.name }}</h3><img></div></div></div></div></div>');
}]);

//# sourceMappingURL=app.js.map