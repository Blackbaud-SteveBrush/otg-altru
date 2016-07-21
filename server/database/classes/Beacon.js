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
            return settings.model.create(data);
        };

        self.deleteOne = function (id) {
            return settings.model.findOneAndRemove({
                UID: UID
            });
        };

        self.findAll = function () {
            return settings.model.find({
                beaconType: settings.beaconType
            }).exec();
        };

        self.findOneById = function (id) {
            return settings.model.findOne({
                _id: id
            }).exec();
        };

        self.findOneByUID = function (UID) {
            return settings.model.findOne({
                UID: UID
            }).exec();
        };

        self.updateOne = function (id, data) {
            var k;
            return self.findOneById(id)
                .success(function (model){
                    for (k in data) {
                        if (data.hasOwnProperty(k)) {
                            model[k] = data[k];
                        }
                    }
                    return model.save();
                })
                .catch(function (error){
                    return error;
                });
        };
    }

    module.exports = Beacon;

}());
