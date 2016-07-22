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
            return new Promise(function (resolve, reject) {
                settings.model.findOneAndRemove({
                    _id: id
                }, function (error) {
                    if (error) {
                        return reject({error: { message: error}});
                    }
                    resolve({
                        success: "Successfully deleted."
                    });
                });
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

        self.findOneByUID = function (uid) {
            return settings.model.findOne({
                UID: uid
            }).exec();
        };

        self.updateOne = function (id, data) {
            return new Promise(function (resolve, reject) {
                self.findOneById(id).then(function (model) {
                    var k;
                    for (k in data) {
                        if (data.hasOwnProperty(k)) {
                            model[k] = data[k];
                        }
                    }
                    model.save(function () {
                        resolve(model.toObject());
                    });
                }).catch(function (error) {
                    reject({ error: { message: error } });
                });
            });
        };
    }

    module.exports = Beacon;

}());
