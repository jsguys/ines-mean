var express = require('express');

var dbconfig = require('./config/db');
var app = express();

var factory = require('./factories/db/dbFactory');

var Person = require('./models/entities/Person');
var Presentation = require('./models/entities/Presentation');

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

    console.log('Example app listening at http://%s:%s', host, port);
});
