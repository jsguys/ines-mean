var mongoose = require('mongoose');

var _collection = 'page';
var _schema = {
    chapterId: {type: mongoose.Schema.Types.ObjectId, ref: 'chapter'},
    title: String,
    templateId: {type: mongoose.Schema.Types.ObjectId, ref: 'template'},
    content: mongoose.Schema.Types.Mixed
};

var Entity = require('../aEntity');
module.exports = new Entity(_collection, _schema);
