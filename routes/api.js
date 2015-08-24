var ApiController = require('../controllers/ApiController');

var api = {
    create: function (req, res) {
        var params = {
            data: req.body,
            entity: req.params.entity
        };

        var api = new ApiController(params);
        api.execute('create', function (success, response) {
            res.json({
                success: success,
                data: response.data || response
            });
        });
    },

    read: function (req, res) {
        var input;

        if (Object.keys(req.params).length === 2) {
            input = {
                entity: req.params[0],
                recursive: req.params[1] ? req.params[1] === 'r' : false
            };
        }
        else {
            input = {
                entity: req.params[0],
                key: req.params[1],
                value: req.params[2],
                recursive: req.params[3] ? req.params[3] === 'r' : false
            };
        }

        var api = new ApiController(input);
        api.execute('read', function (success, response) {
            res.json({
                success: success,
                data: response.data || response
            });
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

        api.execute('update', function (success, response) {
            res.json({
                success: success,
                data: response.data || response
            });
        });
    },

    delete: function (req, res) {
        res.send('currently not defined');
    }
};

module.exports.api = api;