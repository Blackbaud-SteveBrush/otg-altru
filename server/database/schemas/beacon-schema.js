(function() {
    'use strict';

    var mongoose,
        slug,
        visitSchema;

    mongoose = require('mongoose');
    slug = require('mongoose-slug-generator');
    visitSchema = require(__dirname + '/visit-schema');

    mongoose.plugin(slug);

    module.exports = new mongoose.Schema({
        UID: {
            type: String,
            required: true,
            unique: true
        },
        beaconType: {
            type: String,
            required: true,
            default: 'exhibit',
            lowercase: true
        },
        description: String,
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            slug: 'name',
            slug_padding_size: 1,
            unique_slug: true
        },
        visits: [visitSchema]
    }, {
        collection: 'Beacon',
        _id: false,
        discriminatorKey: 'beaconType'
    });
}());
