var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var routes = require('./routes/api');

var app = express();

app.use(bodyParser.urlencoded());
app.use(express.static('public'));

app.post('/api/:entity', routes.api.create);
app.get(/api\/(\w+)\/(\w+)\/(\w+)(?:\/(r))?$/, routes.api.read);
app.get(/^\/api\/(\w+)(?:\/(r))?$/, routes.api.read);
app.put('/api/:entity/:key/:value', routes.api.update);
app.set('port', process.env.port || 3000);

var server = http.createServer(app);
var io = require('./io')(server);

server.listen(app.get('port'), function () {
    console.log('express running on port ' + app.get('port'));
});