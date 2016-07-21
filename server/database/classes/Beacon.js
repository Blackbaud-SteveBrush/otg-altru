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

        self.create = function (data) {
            settings.model.create(data);
        };

        self.deleteOne = function (id) {
            settings.model.findOneAndRemove({
                UID: UID
            });
        };

        self.findAll = function () {
            settings.model.find({
                beaconType: settings.beaconType
            }).exec();
        };

        self.findOneById = function (id) {
            settings.model.findOne({
                _id: id
            }).exec();
        };

        self.findOneByUID = function (UID) {
            settings.model.findOne({
                UID: UID
            }).exec();
        };

        self.updateOne = function (id, data) {
            var k;
            self.findOneById(id)
                .success(function (model){
                    for (k in data) {
                        if (data.hasOwnProperty(k)) {
                            model[k] = data[k];
                        }
                    }
                    model.save();
                })
                .catch(function (error){
                    return error;
                });
        };
    }

    module.exports = Beacon;

}());
