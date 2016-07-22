(function() {
  'use strict';

  var mongoose;

  mongoose = require('mongoose');

  module.exports = new mongoose.Schema({
      description: String,
      image: String,
      link: String,
      name: String
  });
}());
