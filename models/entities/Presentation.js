var _collection = 'presentation';
var _schema = {
    title: String,
    authors: Array,
    date: Number,
    company: {
        name: String,
        department: String,
        location: String
    },
    templates: {
        chapter: ObjectId,
        presentation: ObjectId
    }
};

var Entity = require('../aEntity');
module.exports = new Entity(_collection, _schema);
