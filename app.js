var express = require('express');
var app = express();
var bodyParser = require('body-parser')


var ApiController = require('./controllers/ApiController');

app.use(bodyParser.urlencoded());
/* CREATE START */
app.post('/api/:entity', function (req, res) {
    var params = {
        data: req.body,
        entity: req.params.entity
    };

    var api = new ApiController(params);
    api.execute('create', function (data) {
        res.json(data);
    });
});
/* CREATE END */

/* READ START */
app.get('/api/:entity', function (req, res) {
    var api = new ApiController(req.params);
    api.execute('read', function (data) {
        res.json(data);
    });
});

app.get('/api/:entity/:key/:value', function (req, res) {
    var api = new ApiController(req.params);
    api.execute('read', function (data) {
        res.json(data);
    });
});
/* READ END */

/* UPDATE START */
app.put('/api/:entity/:key/:value', function (req, res) {
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
});
/* UPDATE END */

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};