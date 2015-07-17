var dbConfig = require('../config/db');
var dbDriver = require('../drivers/db/mongodb');
var dbFactory = require('../factories/db/dbFactory');

var ApiController = function (params) {
    this.action = params.action || '';
    this.action = this.action.toUpperCase();

    this.entity = params.entity || '';
    this.entity.capitalize();

    this.key = params.key || '';
    this.value = params.value || '';
};

ApiController.prototype.execute = function (callback) {
    switch (dbDriver.ACTIONS[this.action]) {
        case dbDriver.ACTIONS.READ:
            this.findData(function (data) {
                callback(data);
            });
            break;

        case dbDriver.ACTIONS.CREATE:
        case dbDriver.ACTIONS.UPDATE:
        case dbDriver.ACTIONS.DELETE:
            callback({
                success: false,
                error: {
                    code: 101,
                    msg: 'requested action is not implemented yet'
                }
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

ApiController.prototype.findData = function (callback) {
    var self = this;

    dbFactory.getDriver(dbConfig.driver, function (db) {
        var collection = self.parseEntity();
        if (collection.success) {
            db.connect(dbConfig.host, dbConfig.port, dbConfig.database, dbConfig.user, dbConfig.password);
            db.setEntity(collection.data);

            var filter = {};
            if (self.key && self.value) {
                var matchParam = {};
                var regex = new RegExp('^' + self.value, "i");

                matchParam[self.key] = regex;
                filter.match = matchParam;
            }

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

module.exports = ApiController;