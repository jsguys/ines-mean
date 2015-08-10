var db = require('../aDbDriver.js')();
var mongoose = require('mongoose');

mongoose.connection.on('error', function (err) {
    console.log('[MongoDB Driver] Error while trying to connect');
});

db._models = [];

db.connect = function (host, port, database, user, password) {
    if (!mongoose.connection.readyState) {
        mongoose.connect('mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + database);
    }
};

db.disconnect = function () {
    if (mongoose.connection.readyState) {
        mongoose.disconnect();
    }
};

db.getModel = function () {
    var entity = this.getEntity();

    if (!this._models[entity.getCollection()]) {
        this._models[entity.getCollection()] = mongoose.model(
            entity.getCollection(),
            entity.getSchema(),
            entity.getCollection()
        );
    }

    return this._models[entity.getCollection()];
};

db.create = function (data, callback) {
    if (typeof data !== 'object') {
        console.log('[MongoDB Driver] Error: data has to be an object');
        return;
    }

    var entity = this.getEntity();

    if (entity) {
        var model = this.getModel(entity);
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

    var entity = this.getEntity();

    if (entity) {
        var model = this.getModel(entity);
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

db.update = function (data, callback) {
    if (typeof data !== 'object') {
        console.log('[MongoDB Driver] Error: data has to be an object');
        return;
    }

    var entity = this.getEntity();

    if (entity) {
        var model = this.getModel(entity);

        console.log(data);
        model.update(data.match, data.update, data.options, function (err, data) {
            if (err) {
                console.log('[MongoDB Driver] Error updating data');
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
