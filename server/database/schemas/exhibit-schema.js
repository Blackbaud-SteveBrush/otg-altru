(function() {
    'use strict';

    var mongoose;

    mongoose = require('mongoose');

    module.exports = new mongoose.Schema({
        beaconId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Beacon',
            required: true
        },
        description: String,
        endDate: Date,
        name: {
            type: String,
            trim: true
        },
        pieces: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Piece'
        }],
        startDate: Date
    }, {
        collection: 'Exhibit'
    });

}());
