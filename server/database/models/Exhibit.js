(function() {
    'use strict';

    var BeaconModel,
        mongoose,
        schema;

    BeaconModel = require('../models/Beacon');
    schema = require('../schemas/exhibit-schema');
    mongoose = require('mongoose');

    module.exports = BeaconModel.discriminator('exhibit', schema);
}());
