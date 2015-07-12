var _collection = 'person';
var _schema = {
    surname: String,
    firstname: String,
    email: String,
    initials: String
};

module.exports = require('../aEntity')(_collection, _schema);
