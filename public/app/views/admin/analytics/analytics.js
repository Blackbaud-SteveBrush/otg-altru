(function (angular) {
    'use strict';

    function AnalyticsController($stateParams, ExhibitService, $state) {
        var self = this;

        function uniqueSessionsBetweenDates(data, startDate, endDate) {
            var i,
                sessionIds = [],
                visit;

            i = data.length;
            while (i--) {
                visit = data[i]; 
                if (visit.date_indate >= startDate && visit.date_indate >= startDate && sessionIds.indexOf(visit.sessionId) < 0) {
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

        function buildCards(beacon) {
            var i,
                today = new Date(),
                todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            
            i = beacon.visits.length;
            while (i--) {
                beacon.visits[i].date_indate = new Date(beacon.visits[i].date);
            }

            beacon.cards = [];
            beacon.cards.push({
                title: 'Visitors This Hour',
                count: uniqueSessionsBetweenDates(beacon.visits, addHours(today, -1), today)
            });

            beacon.cards.push({
                title: 'Visitors Last Hour',
                count: uniqueSessionsBetweenDates(beacon.visits, addHours(today, -2), addHours(today, -1))
            });

            beacon.cards.push({
                title: 'Visitors Today',
                count: uniqueSessionsBetweenDates(beacon.visits, todayStart, addDays(todayStart, 1))
            });

            beacon.cards.push({
                title: 'Visitors Yesterday',
                count: uniqueSessionsBetweenDates(beacon.visits, addDays(todayStart, -1), todayStart)
            });

            beacon.cards.push({
                title: 'Visitors Last 7 Days',
                count: uniqueSessionsBetweenDates(beacon.visits,  addDays(todayStart, -7), todayStart)
            });

            beacon.cards.push({
                title: 'Visitors Last 30 Days',
                count: uniqueSessionsBetweenDates(beacon.visits, addDays(todayStart, -30), todayStart)
            });
        }

        ExhibitService.getAll().then(function(data) {
            var i;

            self.beacons = data.value;
                
            i = self.beacons.length;
            while (i--) {
                buildCards(self.beacons[i]);
            }
        });
    }

    AnalyticsController.$inject = [
        '$stateParams',
        'ExhibitService',
        '$state'
    ];

    angular.module('sky-beacons')
        .controller('AnalyticsController', AnalyticsController);
}(window.angular));
