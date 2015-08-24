var mongoose = require('mongoose');

var _collection = 'chapter';
var _schema = {
    title: String,
    rank: Number,
    duration: Number,
    persons: [{type: mongoose.Schema.Types.ObjectId, ref: 'person'}]
};

var Entity = require('../aEntity');
module.exports = new Entity(_collection, _schema);