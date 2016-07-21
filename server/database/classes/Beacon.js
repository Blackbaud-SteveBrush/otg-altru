(function () {
    'use strict';

    var _;

    _ = require('lodash');

    function Beacon(options) {
        var defaults,
            self,
            settings;

        self = this;
        defaults = {
            beaconType: 'exhibit'
        };
        settings = _.merge({}, defaults, options || {});

        if (!settings.model) {
            throw new Error("The attribute `model` is required when instantiating the Beacon class!");
        }

        self.create = function (requestBody) {
            settings.model
        };

        self.deleteOne = function (deliverableId) {
            settings.model
        };

        self.findAll = function (callback) {
            settings.model
        };

        self.findOneById = function (deliverableId) {
            settings.model
        };

        self.findOneBySlug = function (slug) {
            settings.model
        };

        self.save = function(model) {

        };

        self.updateOne = function (deliverableId, data) {
            self.findOneById(deliverableId, function (error, model) {
        };
    }

    module.exports = Beacon;

}());
