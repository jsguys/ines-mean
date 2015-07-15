var _collection = 'person';
var _schema = {
    surname: String,
    firstname: String,
    email: String,
    initials: String
};

var Entity = require('../aEntity');
module.exports = new Entity(_collection, _schema);
