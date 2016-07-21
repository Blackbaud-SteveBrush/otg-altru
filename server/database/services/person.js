(function() {
    'use strict';

    var Beacon,
        utils;

    Beacon = require('../classes/Beacon');
    utils = require('../../libs/utils');

    function Person() {
        Beacon.call(this, {
            beaconType: 'person',
            model: require('../models/Person')
        });
    }

    utils.mixin(Person, Beacon);

    module.exports = new Person();

}());
