(function () {
    'use strict';

    var DocentService,
        utils;

    DocentService = require('../../database/services/docent');
    utils = require('../../libs/utils');

    module.exports = {
        deleteDocent: function (request, response, next) {
            DocentService.deleteOne(request.params.id).then(function (data) {
                response.json({
                    success: "Docent deleted successfully."
                });
            }).catch(function (error) {
                utils.parseError(response, error);
            });
        },
        getDocent: function (request, response, next) {
            DocentService.findOneById(request.params.id).then(function (data) {
                response.json(data);
            }).catch(function (error) {
                utils.parseError(response, error);
            });
        },
        getDocents: function (request, response, next) {
            DocentService.findAll().then(function (data) {
                response.json({
                    count: data.length || 0,
                    value: data
                });
            }).catch(function (error) {
                utils.parseError(response, error);
            });
        },
        postDocent: function (request, response, next) {
            DocentService.create(request.body.data).then(function (data) {
                response.json(data);
            }).catch(function (error) {
                utils.parseError(response, error);
            });
        },
        putDocent: function (request, response, next) {
            DocentService.update(request.params.id).then(function (data) {
                response.json(data);
            }).catch(function (error) {
                utils.parseError(response, error);
            });
        }
    };
}());
