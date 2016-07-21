(function () {
    'use strict';

    var ExhibitService,
        utils;

    ExhibitService = require('../../database/services/exhibit');
    utils = require('../../libs/utils');

    module.exports = {
        deleteExhibit: function (request, response, next) {
            ExhibitService.deleteOne(request.params.id).then(function (data) {
                response.json({
                    success: "Exhibit deleted successfully."
                });
            }).catch(function (error) {
                utils.parseError(response, error);
            });
        },
        getExhibit: function (request, response, next) {
            console.log(request.params.id);
            ExhibitService.findOneById(request.params.id).then(function (data) {
                response.json(data);
            }).catch(function (error) {
                utils.parseError(response, error);
            });
        },
        getExhibits: function (request, response, next) {
            ExhibitService.findAll().then(function (data) {
                response.json({
                    count: data.length || 0,
                    value: data
                });
            }).catch(function (error) {
                utils.parseError(response, error);
            });
        },
        postExhibit: function (request, response, next) {
            ExhibitService.create(request.body.data).then(function (data) {
                response.json(data);
            }).catch(function (error) {
                utils.parseError(response, error);
            });
        },
        putExhibit: function (request, response, next) {
            ExhibitService.update(request.params.id).then(function (data) {
                response.json(data);
            }).catch(function (error) {
                utils.parseError(response, error);
            });
        }
    };
}());
