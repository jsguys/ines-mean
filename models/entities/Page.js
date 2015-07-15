var _collection = 'page';
var _schema = {
    title: String,
    predecessor: ObjectId,
    successor: ObjectId,
    layout: ObjectId,
    page_content: ObjectId,
    rank: Number
};

module.exports = require('../aEntity')(_collection, _schema);
