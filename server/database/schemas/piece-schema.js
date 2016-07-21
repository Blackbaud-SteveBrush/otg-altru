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
      creationDate: Date,
      creator: String,
      description: String,
      name: {
          type: String,
          trim: true
      },
      tags: [String]
  }, {
      collection: 'Piece'
  });
}());
