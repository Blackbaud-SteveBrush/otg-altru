(function() {
    'use strict';

    var BeaconModel,
        mongoose,
        schema;

    BeaconModel = require('../models/Beacon');
    schema = require('../schemas/person-schema');
    mongoose = require('mongoose');

    module.exports = BeaconModel.discriminator('person', schema);
}());
