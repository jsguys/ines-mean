var ApiController = require('../controllers/ApiController');

var api = {
    create: function (req, res) {
        var params = {
            data: req.body,
            entity: req.params.entity
        };

        var api = new ApiController(params);
        api.execute('create', function (data) {
            res.json(data);
        });
    },

    read: function (req, res) {
        var api = new ApiController(req.params);
        api.execute('read', function (data) {
            res.json(data);
        });
    },

    update: function (req, res) {
        var params = {
            entity: req.params.entity,
            key: req.params.key,
            value: req.params.value,
            data: {
                update: req.body.data,
                options: req.body.options
            }
        };

        var api = new ApiController(params);

        api.execute('update', function (data) {
            res.json(data);
        });
    },

    delete: function (req, res) {
        res.send('currently not defined');
    }
};

module.exports.api = api;