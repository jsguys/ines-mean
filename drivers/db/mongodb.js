var db = require('../aDbDriver.js')();
var mongoose = require('mongoose');

mongoose.connection.on('error', function () {
    console.log('[MongoDB Driver] Error while trying to connect');
});

db.connect = function (host, port, database, user, password) {
    mongoose.connect('mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + database);
};

db.disconnect = function () {
    mongoose.disconnect();
};

db.create = function (data, callback) {
    if (typeof data !== 'object') {
        console.log('[MongoDB Driver] Error: data has to be an object');
        return;
    }

    var model = db.getModel();

    if (model) {
        model.create(data, function (err) {
            if (typeof callback === 'function') {
                callback(err);
            }
        });
    }
    else {
        console.log('[MongoDB Driver] Error: entity was not found');
    }
};

db.read = function (data, callback) {
    if (typeof data !== 'object') {
        console.log('[MongoDB Driver] Error: data has to be an object');
        return;
    }

    var model = db.getModel();

    if (model) {
        model.find(data.match, data.select, data.modify, function (err, data) {
            if (err) {
                console.log('[MongoDB Driver] Error reading data');
            }
            else {
                callback(data);
            }
        });
    }
    else {
        console.log('[MongoDB Driver] Error: entity was not found');
    }
};

module.exports = db;
