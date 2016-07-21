(function() {
    'use strict';

    var mongoose;

    mongoose = require('mongoose');

    module.exports = new mongoose.Schema({
        date: {
            type: Date,
            required: true,
            default: Date.now()
        },
        sessionId: {
            type: String,
            required: true
        }
    }, {
          _id: false,
    });
}());
