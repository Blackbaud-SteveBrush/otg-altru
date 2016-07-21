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