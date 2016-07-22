(function() {
  'use strict';

  var mongoose;

  mongoose = require('mongoose');

  module.exports = new mongoose.Schema({
      expertise: String,
      title: String
  }, {
      discriminatorKey: 'beaconType'
  });
}());
