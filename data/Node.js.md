# Node.js

## Was ist Node.js?
* serverseitiges JavaScript-Framework
* Google V8 JavaScript engine
* schnell und flexibel einsetzbar

## Entstehung
* 2009: entwickelt von Ryan Dahl bei der Firma Joyent
* 2011: Einführung von npm
* 2011: Partnerschaft von Joyent und Microsoft
* 2015: Gründung der Node.js Foundation
  * Ziele: Node.js soll unabhängig von Joyent werden
  * Mitglieder: IBM, Microsoft, Paypal, SAP

## Node.js vs. Frontend JavaScript
* Leichtere Modularisierung
* Datenströme

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

## Node package manager
* Installation und Verwaltung von Modulen
* Mehr als 177.000 Module verfügbar


## Eine Node App installieren
* Initialisierung über npm
* Node.js-Module installieren und verwalten
* Konfigurationsdatei package.json

## Module einbinden
* require und exports

* module/greetings.js
```javascript
module.exports = {
    sayHello: function () {
      return 'Hello Manuel!';
    },

    sayGoodbye: function () {
      return 'Goodbye Manuel!';
    }
}
```

* app.js
```javascript
var greetings = require('./module/greetings');

greetings.sayHello(); // Hello Manuel!
greetings.sayGoodbye(); // Goodbye Manuel!
```

## Aus der Modulwelt...
* mocha: Einbindung von TDD
* gulp: Automatisierte Tasks schreiben
* socket.io: Websockets einrichten
* forever: Automatisierter Betrieb

## Wo kann ich Node.js einsetzen?
* REST-Dienste auf JSON-Basis
* Single-Page-Anwendungen
* Streaming

## Nachteile
* kleine Community im Vergleich zu PHP
* sauberes Programmieren erforderlich

## Vorteile
* Backend und Frontend sprechen gleich
* performante Abarbeitung vieler Anfragen

## Vergleich zu PHP
* kein zusätzlicher Webserver nötig
* synchron vs. asynchron
* Arbeitsspeicher
* Performance

## Zukunft
* Integration von io.js in Node.js
* Node.js rückt mehr in den Fokus
* Etablierung von ECMAScript 6

