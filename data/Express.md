# Express


## Was ist Express?

* Webserver für Node.js
* Best-Practises


## Beispiel: Einfacher Webserver

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(1337);
```


## Entstehung

* 2009: Entwickelt von TJ Holowaychuk
* 2014: Weiterentwicklung durch Doug Wilson
* 2015: Beliebtestes npm Modul


## Ablauf

* Instanziierung Express & Dependencies
* (Datenbank verbinden)
* Server konfigurieren
* Middleware
* Routing


## Request

* Infos wie IP, Pfad und Parameter


# Response

* Socket zum Client


## Middleware

* Schicht zwischen Einstellungen und Routing
* Einfache Einbindung von Modulen
* Kapselung der Bestandteile


## Beispiel: Middleware

```javascript
var logger = require('morgan');

app.use(logger('combined'));
```


## Beispiel: Middleware

```javascript
app.use(function (req, res, next) {
  // do stuff
  next();
});
```


## Routing

* Angabe der Pfade mittels Regex
* Platzhalter in Pfad definieren


### Beispiel: Routing

```javascript
app.post('/api/.*', function (req, res) {
  res.status(404).end();
]);
```


## Vor- & Nachteile

#### Pro
* Leichtgewicht
* Code over configuration

#### Con
* Nicht auf Statics spezialisiert
* Sicherheit


## Vergleich zu apache




## Zukunft / Ausblick

* Immer mehr Middleware
* Große Community
* Stetige Weiterentwicklung
