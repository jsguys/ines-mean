var _collection = 'presentation';
var _schema = {
    title: String,
    author: Array,
    date: Date,
    company: {
        name: String,
        department: String,
        location: String
    }
};

module.exports = require('../aEntity')(_collection, _schema);