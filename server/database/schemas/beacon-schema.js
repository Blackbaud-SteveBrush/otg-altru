(function() {
    'use strict';

    var mongoose,
        pieceSchema,
        slug,
        visitSchema;

    mongoose = require('mongoose');
    pieceSchema = require(__dirname + '/piece-schema');
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
        image: String,
        name: {
            type: String,
            required: true,
            trim: true
        },
        pieces: [pieceSchema],
        slug: {
            type: String,
            slug: 'name',
            slug_padding_size: 1,
            unique_slug: true
        },
        visits: [visitSchema]
    }, {
        collection: 'Beacon',
        discriminatorKey: 'beaconType'
    });
}());
