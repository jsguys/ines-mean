# Node.js

## Was ist Node.js?
* serverseitiges Javascript-Framework
* Google V8 JavaScript engine
* schnell und flexibel einsetzbar

## Charakteristika
* modulbasierte Architektur
* eventbasierend
* Open Source

## Die wichtigsten Module
* http: Webserver-Modul
* fs: File-Modul
* querystring: Parameterformatierung
* util: Sammlung wichtiger Funktionen
* buffer: Datenströme

## Beispiel: einfacher Webserver
* lediglich http-Modul nötig

```javascript
var http = require('http');

var server = http.createServer(function (req, res) {
  res.send('Hello World!');
});

server.listen(1337);
```
