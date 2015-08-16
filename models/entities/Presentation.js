var mongoose = require('mongoose');

var _collection = 'presentation';
var _schema = {
    title: String,
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'person'}],
    date: Number,
    company: {
        name: String,
        department: String,
        location: String
    },
    templateId: {type: mongoose.Schema.Types.ObjectId, ref: 'template'},
    orderId: {type: mongoose.Schema.Types.ObjectId, ref: 'order'}
};

var Entity = require('../aEntity');
module.exports = new Entity(_collection, _schema);