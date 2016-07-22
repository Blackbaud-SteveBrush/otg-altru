(function (angular) {
    'use strict';

    function BeaconController($stateParams, ExhibitService, $state) {
        var self = this;

        function uniqueSessionsBetweenDates(data, startDate, endDate) {
            var i,
                sessionIds = [],
                visit;

            i = data.length;
            while (i--) {
                visit = data[i]; 
                if (visit.date_indate >= startDate && visit.date_indate <= endDate && sessionIds.indexOf(visit.sessionId) < 0) {
                    sessionIds.push(visit.sessionId);
                }
            }

            return sessionIds.length;
        }

        function addHours(date, hours) {
            var result = new Date(date);
            result.setHours(result.getHours() + hours);
            return result;
        }

        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        function buildCards() {
            var i,
                today = new Date(),
                todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            
            i = self.beacon.visits.length;
            while (i--) {
                self.beacon.visits[i].date_indate = new Date(self.beacon.visits[i].date);
            }

            self.cards = [];
            self.cards.push({
                title: 'Visitors This Hour',
                count: uniqueSessionsBetweenDates(self.beacon.visits, addHours(today, -1), today)
            });

            self.cards.push({
                title: 'Visitors Last Hour',
                count: uniqueSessionsBetweenDates(self.beacon.visits, addHours(today, -2), addHours(today, -1))
            });

            self.cards.push({
                title: 'Visitors Today',
                count: uniqueSessionsBetweenDates(self.beacon.visits, todayStart, addDays(todayStart, 1))
            });

            self.cards.push({
                title: 'Visitors Yesterday',
                count: uniqueSessionsBetweenDates(self.beacon.visits, addDays(todayStart, -1), todayStart)
            });

            self.cards.push({
                title: 'Visitors Last 7 Days',
                count: uniqueSessionsBetweenDates(self.beacon.visits,  addDays(todayStart, -7), todayStart)
            });

            self.cards.push({
                title: 'Visitors Last 30 Days',
                count: uniqueSessionsBetweenDates(self.beacon.visits, addDays(todayStart, -30), todayStart)
            });
        }

        ExhibitService.getById($stateParams.id).then(function(data) {
            self.beacon = data;

            buildCards();
        });

        self.goToEdit = function (beacon) {
            switch (self.beacon.beaconType) {
                case 'docent':
                    $state.go('admin.forms.docent', { id: self.beacon._id });
                    break;
                case 'exhibit':
                    $state.go('admin.forms.exhibit', { id: self.beacon._id });
                    break;
            }
        };
    }

    BeaconController.$inject = [
        '$stateParams',
        'ExhibitService',
        '$state'
    ];

    angular.module('sky-beacons')
        .controller('BeaconController', BeaconController);
}(window.angular));
