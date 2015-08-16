var mongoose = require('mongoose');

var _collection = 'order';
var _schema = {
    pageId: {type: mongoose.Schema.Types.ObjectId, ref: 'page'},
    predecessor: {type: mongoose.Schema.Types.ObjectId, ref: 'order'},
    successor: {type: mongoose.Schema.Types.ObjectId, ref: 'order'}
};

var Entity = require('../aEntity');
module.exports = new Entity(_collection, _schema);