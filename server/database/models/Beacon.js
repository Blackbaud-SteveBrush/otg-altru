(function() {
    'use strict';

    var mongoose,
        schema;

    schema = require('../schemas/beacon-schema');
    mongoose = require('mongoose');

    module.exports = mongoose.model('Beacon', schema);
}());
