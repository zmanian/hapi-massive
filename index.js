"use strict";
exports.__esModule = true;
var massive = require("massive");
exports.register = function (server, options, next) {
    var config = options;
    massive.connect({
        connectionString: config.connectionString
    }, function (err, db) {
        if (err) {
            return next(err);
        }
        server.expose("db", db);
        return next();
    });
};
exports.register.attributes = {
    pkg: require("./package.json")
};
