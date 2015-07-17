var express = require('express');
var app = express();

var ApiController = require('./controllers/ApiController');

app.get('/api/:action/:entity', function (req, res) {
    var api = new ApiController(req.params);
    api.execute(function (data) {
        res.json(data);
    });
});

app.get('/api/:action/:entity/:key/:value', function (req, res) {
    var api = new ApiController(req.params);
    api.execute(function (data) {
        res.json(data);
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};