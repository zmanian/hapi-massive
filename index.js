"use strict";
exports.__esModule = true;
var massive = require("massive");
var Path = require("path");
exports.plugin = {
    register: function (server, options, next) {
        massive.connect({
            connectionString: options.connectionString
        }, function (err, db) {
            if (err) {
                return next(err);
            }
            var models = options.models || {};
            // The addModel closure takes a model object and mutates the models variable with new data.
            // The
            var addModel = function (key, model, db) {
                model.db =
                    models[key] = model;
                server.expose(key, model);
            };
            Object.keys(models).forEach(function (key) {
                var modelPath = models[key];
                if (modelPath !== Path.resolve(modelPath)) {
                    modelPath = Path.join(process.cwd(), modelPath);
                }
                addModel(key, require(modelPath), db);
            });
            server.expose("db", db);
            return next();
        });
    },
    attributes: {
        pkg: require("./package.json")
    }
};
