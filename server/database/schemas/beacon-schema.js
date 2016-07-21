(function() {
    'use strict';

    var mongoose;

    mongoose = require('mongoose');

    module.exports = new mongoose.Schema({
        beaconUUID: {
            type: String,
            required: true
        },
        beaconType: {
            type: String,
            required: true,
            default: 'exhibit'
        },
        name: {
            type: String,
            trim: true
        },
        url: {
            type: String,
            required: true
        }
    }, {
        collection: 'Beacon'
    });
}());
