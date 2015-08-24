# AngularJS

## Was ist AngularJS

* Frontend Framework
* Single-Page-Apps
* Erweitert HTML
* MVW

## Entstehung

* 2009: Entwicklung von Adam Abrons & Miško Hevery
* 2010: Open Source auf GitHub
* 2010: Weiterentwicklung durch Google
* 2015: Ankündigung von AngularJS 2.0

## Expressions

```html
<p>4 + 4 = {{ 4 + 4 }}</p>
```

## Directives

* Logik durch HTML Attribute (*ng-**) und Tags
* Trennung Logik & HTML

```html
<html ng-app="ines">
  <div ng-show="true">
    <p>Hello World</p>
  </div>
</html>
```

## Filters

* Formatierung / Umwandlung
* Abstraktion

```javascript
{{ filter_expression | filter : expression : comparator }}
{{ 1440720000000 | date : 'dd.mm.yyyy' }}
{{ 2.81 | currency }}
```

## two-way data binding

* Aktualisierung von Inhalten
* Reaktion auf User
* Erkennung durch $scope
* Erklärung mit Bild
  
  ![Bild](https://angularjs.de/assets/figures/binding-types-c6d3761feda6211a53fd9260194faf23a6caa7d5d47fb29c64b80147402d0ff0.png)

---

* demo mit form

## Dependency Injection

* Einfache Einbindung von Modulen
* Hoche Wiederverwertung
* Instanziierung durch Injector
* Abstraktion und Testbarkeit

```javascript
app.controller('MyController',
  function ($scope, $http) {
    // controller logic
});
```

## Promises

* Anderer Ansatz zu Callbacks
* Klarere Struktur / weniger Schachtelungen

```javascript
$http.get('/get/magic/maik/')
  .success(function (result) {
    // handle result on success
  })
  .error(function (error) {
    // handle error on failure (optional)
  });
```

## Tests

* Einfach testbar durch DI / Module
* Karma


## Vergleich zu HTML & jQuery

* Wiederverwendung
* Bessere Aufteilung
* Trennung Logik & Templates
* Keine DOM-Manipulation


## Zukunft / Ausblick

* Große Beliebtheit
* Große Community + Google

* AngularJS 2 mit neuer Basis


## Think tank

* Quiz am Ende der Präsentation
* Umbau von Orders auf Basis von Audience, Beamer und Remote
