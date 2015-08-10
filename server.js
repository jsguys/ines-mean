var express = require('express');
var http = require('http');

var dbconfig = require('./config/db');
var app = express();
var bodyParser = require('body-parser')
var routes = require('./routes/api');

app.use(bodyParser.urlencoded());

app.post('/api/:entity', routes.api.create);
app.get('/api/:entity/:key/:value', routes.api.read);
app.get('/api/:entity', routes.api.read);
app.put('/api/:entity/:key/:value', routes.api.update);

app.route('/').get(function (req, res) {
    factory.getDriver(dbconfig.driver, function (db) {
        db.connect(dbconfig.host, dbconfig.port, dbconfig.database, dbconfig.user, dbconfig.password);

        db.setEntity(Person);
        db.crud(db.ACTIONS.READ, {}, function (result) {
           console.log(1, result);
        });

        db.setEntity(Presentation);
        db.crud(db.ACTIONS.READ, {}, function (result) {
            console.log(2, result);
        });

        db.setEntity(Person);
        db.crud(db.ACTIONS.READ, {}, function (result) {
            console.log(3, result);
        });

        res.send('root');
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

var server = http.createServer(app);

var io = require('./io')(server);

server.listen(app.get('port'), function () {
    console.log('express running on port ' + app.get('port'));
});

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};