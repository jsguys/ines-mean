var dbConfig = require('../config/db');
var dbFactory = require('../factories/db/dbFactory');

var ApiController = function (params) {
    this.entity = params.entity || '';
    this.entity.capitalize();

    this.key = params.key || '';
    this.value = params.value || '';

    this.recursive = params.recursive || false;

    this.data = params.data || null;
};

ApiController.prototype.execute = function (action, callback) {
    var self = this;
    self.action = action.toUpperCase();

    dbFactory.getDriver(dbConfig.driver, function (db) {
        var collection = db.getEntity(self.entity);
        if (collection.success) {
            db.connect(dbConfig.host, dbConfig.port, dbConfig.database, dbConfig.user, dbConfig.password);

            var data = {
                entity: self.entity,
                key: self.key,
                value: self.value,
                recursive: self.recursive
            };

            db.crud(db.ACTIONS[self.action], data, function (success, result) {
                callback(success, {data: result});
            });
        }
        else {
            callback(collection);
        }
    });
};

module.exports = ApiController;

String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};