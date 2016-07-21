(function() {
    'use strict';

    var Beacon,
        utils;

    Beacon = require('../classes/Beacon');
    utils = require('../../libs/utils');

    function Exhibit() {
        Beacon.call(this, {
            beaconType: 'exhibit',
            model: require('../models/Exhibit')
        });
    }

    utils.mixin(Exhibit, Beacon);

    module.exports = new Exhibit();

}());
