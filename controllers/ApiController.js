var dbConfig = require('../config/db');
var dbDriver = require('../drivers/db/mongodb');
var dbFactory = require('../factories/db/dbFactory');

var ApiController = function (params) {
    this.entity = params.entity || '';
    this.entity.capitalize();

    this.key = params.key || '';
    this.value = params.value || '';

    this.data = params.data || null;
};

ApiController.prototype.execute = function (action, callback) {
    this.action = action.toUpperCase();

    switch (dbDriver.ACTIONS[this.action]) {
        case dbDriver.ACTIONS.READ:
            this.find(function (data) {
                callback(data);
            });
            break;

        case dbDriver.ACTIONS.CREATE:
            this.insert(function (data) {
                callback(data);
            });
            break;

        case dbDriver.ACTIONS.UPDATE:
            this.update(function (data) {
                callback(data);
            });
            break;

        case dbDriver.ACTIONS.DELETE:
            this.insert(function (data) {
                callback(data);
            });
            break;

        default:
            callback({
                success: false,
                error: {
                    code: 100,
                    msg: 'requested action is not defined'
                }
            });
            break;
    }
};

ApiController.prototype.find = function (callback) {
    var self = this;

    dbFactory.getDriver(dbConfig.driver, function (db) {
        var collection = self.parseEntity();
        if (collection.success) {
            db.connect(dbConfig.host, dbConfig.port, dbConfig.database, dbConfig.user, dbConfig.password);
            db.setEntity(collection.data);

            var filter = {};
            filter.match = self.buildMatchObject();

            db.crud(db.ACTIONS[self.action], filter, function (result) {
                callback({
                    success: true,
                    data: result
                });
            });
        }
        else {
            callback(collection);
        }
    });

};

ApiController.prototype.parseEntity = function () {
    try {
        entity = require('../models/entities/' + this.entity);
    }
    catch (err) {
        return {
            success: false,
            error: {
                code: 103,
                msg: 'requested entity was not found'
            }
        };
    }

    return {
        success: true,
        data: entity
    };
};

ApiController.prototype.insert = function (callback) {
    var self = this;

    dbFactory.getDriver(dbConfig.driver, function (db) {
        var collection = self.parseEntity();
        if (collection.success) {
            db.connect(dbConfig.host, dbConfig.port, dbConfig.database, dbConfig.user, dbConfig.password);
            db.setEntity(collection.data);

            db.crud(db.ACTIONS[self.action], self.data, function (result) {
                callback({
                    success: true,
                    data: result
                });
            });
        }
    });
};

ApiController.prototype.update = function (callback) {
    var self = this;

    dbFactory.getDriver(dbConfig.driver, function (db) {
        var collection = self.parseEntity();
        if (collection.success) {
            db.connect(dbConfig.host, dbConfig.port, dbConfig.database, dbConfig.user, dbConfig.password);
            db.setEntity(collection.data);

            self.data.match = self.buildMatchObject();

            if (self.data.options && self.data.options.upsert) {
                self.data.options.upsert = self.data.options.upsert === '1';
            }

            db.crud(db.ACTIONS[self.action], self.data, function (result) {
                callback({
                    success: true,
                    data: result
                });
            });
        }
    });
};

ApiController.prototype.buildMatchObject = function () {
    var self = this;

    if (self.key && self.value) {
        var match = {};

        try {
            var regex = new RegExp('^' + self.value + '$', 'i');
            match[self.key] = regex;
            return match;
        }
        catch (e) {
            console.log(e);

            return {phpguys: true};
        }
    }

    return null;
};

module.exports = ApiController;