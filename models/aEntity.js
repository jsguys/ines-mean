var mongoose = require('mongoose');
var _collection = '';
var _schema = '';

module.exports = function (collection, schema) {
    _collection = collection;
    _schema = schema;

    return {
        getModel: function () {
            return mongoose.model(_collection, _schema, _collection);
        }
    };
};