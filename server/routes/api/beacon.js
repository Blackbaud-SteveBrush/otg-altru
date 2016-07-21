(function () {
    'use strict';

    var BeaconModel,
        utils;

    BeaconModel = require('../../database/models/Beacon');
    utils = require('../../libs/utils');

    module.exports = {
        getBeacon: function (request, response, next) {
            BeaconModel.findOne({
                UID: request.params.uid
            }).exec().then(function (data) {
                var url;
                url = 'https://sky-beacons.herokuapp.com/';
                switch (data.beaconType) {
                case 'exhibit':
                    url += 'exhibits/';
                break;
                }
                url += data.slug;
                data.visits.push({
                    sessionId: request.session.id
                });
                data.save(function () {
                    response.redirect(url);
                });
            }).catch(function (error) {
                utils.parseError(response, error);
            });
        }
    };
}());
