(function() {
  'use strict';

  var mongoose;

  mongoose = require('mongoose');

  module.exports = new mongoose.Schema({
      description: String,
      image: {
          fileName: String,
          data: String
      },
      links: [String],
      name: String
  });
}());
