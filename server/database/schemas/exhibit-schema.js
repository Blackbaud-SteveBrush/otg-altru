(function() {
    'use strict';

    var mongoose;

    mongoose = require('mongoose');

    module.exports = new mongoose.Schema({
        endDate: Date,
        startDate: Date
    }, {
        discriminatorKey: 'beaconType'
    });

}());
