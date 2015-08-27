var db = require('../aDbDriver.js')();
var mongoose = require('mongoose');
var path = require('path');

mongoose.connection.on('error', function (err) {
    console.log('[MongoDB Driver] Error while trying to connect');
	console.log(err);
});

db._models = [];
db._modelPath = '/models/entities/';

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

db.getEntity = function (name) {
    var entity = name;

    var splitted = process.mainModule.filename.split(path.sep);
    splitted.pop();
    var requirePath = splitted.join(path.sep);

    try {
        entity = require(path.normalize(requirePath + this._modelPath + entity.capitalize()));
    }
    catch (err) {
        return {
            success: false,
            error: {
                msg: 'error parsing entity',
                text: err
            }
        };
    }

    return {
        success: true,
        data: entity
    };
};

db.getModel = function (name) {
    var entity = this.getEntity(name);

    if (!entity.success) {
        return;
    }

    entity = entity.data;

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

    var model = this.getModel(entity);
    model.create(data, function (err) {
        if (typeof callback === 'function') {
            callback(false, err);
        }
    });
};

db.read = function (data, callback) {
    if (typeof data !== 'object') {
        callback(false, {
            msg: 'data is not an object'
        });
    }

    var model = this.getModel(data.entity);
    var query;

    if (data.recursive) {
        var dependents = this.loadDependentModels(model.schema);
    }

    if (data.key === '_id') {
        if (mongoose.Types.ObjectId.isValid(data.value)) {
            query = model.findById(data.value);
        }
    }
    else {
        var match = this.buildMatchObject(data);
        query = model.find(match, data.select, data.modify);
    }

    if (query) {
        if (data.recursive && dependents.length) {
            query = query.populate(dependents.join(' '));
        }

        query.exec(function (err, data) {
            if (err) {
                callback(false, err);
            }
            else {
                if (data.length === 0) {
                    data = [data];
                }
                callback(true, data);
            }
        });
    }
    else {
        callback(false, {});
    }
};

db.update = function (data, callback) {
    if (typeof data !== 'object') {
        console.log('[MongoDB Driver] Error: data has to be an object');
        return;
    }

    var model = this.getModel(data.entity);

    model.update(data.match, data.update, data.options, function (err, data) {
        if (err) {
            console.log('[MongoDB Driver] Error updating data');
        }
        else {
            callback(true, data);
        }
    });
};

db.buildMatchObject = function (data) {
    if (data.key && data.value) {
        var match = {};
        var model = this.getModel(data.entity);
        var schemaType = model.schema.path(data.key);

        switch (schemaType.instance) {
            case 'ObjectID':
                if (mongoose.Types.ObjectId.isValid(data.value)) {
                    match[data.key] = new mongoose.Types.ObjectId(data.value);
                }
                else {
                    match[data.key] = null;
                }
                break;

            case 'Number':
                match[data.key] = data.value;
                break;

            case 'String':
                var regex = new RegExp('^' + data.value + '$', 'i');
                match[data.key] = regex;
                break;

            default:
                var msg = 'type "' + schemaType.instance + '" is not implemented yet';
                console.log(msg);
                return false;
        }

        return match;
    }

    return null;
};

db.loadDependentModels = function (schema) {
    var dependents = [];
    if (schema.hasOwnProperty('tree')) {
        for (var item in schema.tree) {
            if (schema.tree[item].hasOwnProperty('ref') ||
                (schema.tree[item][0]) && schema.tree[item][0].hasOwnProperty('ref')
            ) {
                if (schema.tree[item][0]) {
                    this.getModel(schema.tree[item][0].ref);
                }
                else {
                    this.getModel(schema.tree[item].ref);
                }
                dependents.push(item);
            }
        }

        return dependents;
    }

    return false;
};

module.exports = db;
