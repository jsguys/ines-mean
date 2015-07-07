var express = require('express');
var mongoose = require('mongoose');
var jade = require('jade');

var config = require('./config/app');
var dbconfig = require('./config/db');
var app = express();

var factory = require('./factories/db/dbFactory');
var driver = factory.getDriver(dbconfig.driver, function (driver) {
    console.log(driver);
});

app.get('/', function (req, res) {
    var fn = jade.compileFile('templates/start.jade', {pretty: true});
    var html = fn(config);

    res.send(html);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
