var express = require('express');
var app = express();

app.set('port', process.env.port || 3000);
app.use(express.static('public'));

app.get('/api', function (res, res) {
    res.write('ines api').end();
});

app.get('/', function (req, res) {
    res.status(404).end();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
