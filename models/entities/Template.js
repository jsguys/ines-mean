var _collection = 'template';
var _schema = {
    title: String,
    type: String,
    content: String
};

var Entity = require('../aEntity');
module.exports = new Entity(_collection, _schema);
