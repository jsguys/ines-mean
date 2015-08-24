var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');

var appConfig = require('./config/app.js');
var routes = require('./routes/api');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/api/:entity', routes.api.create);
app.get(/^\/api\/(\w+)\/(\w+)\/(\w+)(?:\/(r))?$/, routes.api.read);
app.get(/^\/api\/(\w+)(?:\/(r))?$/, routes.api.read);
app.put('/api/:entity/:key/:value', routes.api.update);

app.get('/wifi', function (req, res) {
  res.send(require('./config/wifi.js'));
});

app.set('port', appConfig.port);

var server = http.createServer(app);
var io = require('./io')(server);

server.listen(app.get('port'), function () {
    console.log('express running on port ' + app.get('port'));
});