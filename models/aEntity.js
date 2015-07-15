var _collection = '';
var _schema = '';

var aEntity = function (collection, schema) {
    this._collection = collection;
    this._schema = schema;

    this.getCollection = function () {
        return this._collection;
    };

    this.getSchema = function () {
        return this._schema;
    }
};

module.exports = aEntity;