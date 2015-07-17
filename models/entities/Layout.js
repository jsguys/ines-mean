var _collection = 'layout';
var _schema = {
    title: String,
    content: String
};

var Entity = require('../aEntity');
module.exports = new Entity(_collection, _schema);
