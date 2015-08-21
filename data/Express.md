# Express


## Was ist Express

* Webserver für Node.js
* Best-Practises

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello {{local.name}}!');
});

var server = app.listen(1337);
```

## Routing

* RegEx für Pfad

```javascript
app.post('/api.*', function (req, res) {
  res.status(404).end();
]);
```

## Req / res


## Middleware

* Einfache Einbindung von Modulen
* Kapselung der Bestandteile


# Vergleich zu apache

* Leichtgewicht
* Code over configuration

* Nicht auf Statics spezialisiert
* Sicherheit


## Zukunft / Ausblick

* Immer mehr Module
