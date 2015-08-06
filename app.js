var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var routes = require('./routes/api');

app.use(bodyParser.urlencoded());

app.post('/api/:entity', routes.api.create);
app.get('/api/:entity/:key/:value', routes.api.read);
app.get('/api/:entity', routes.api.read);
app.put('/api/:entity/:key/:value', routes.api.update);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};