var _collection = 'page';
var _schema = {
    title: String,
    predecessor: ObjectId,
    successor: ObjectId,
    layout: ObjectId,
    page_content: ObjectId,
    rank: Number,
    chapter: String
};

var Entity = require('../aEntity');
module.exports = new Entity(_collection, _schema);
