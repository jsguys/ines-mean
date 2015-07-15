var _collection = 'chapter';
var _schema = {
    title: String,
    duration: Number,
    speakers: Array
};

module.exports = require('../aEntity')(_collection, _schema);
