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

var Entity = require('../aEntity');
module.exports = new Entity(_collection, _schema);