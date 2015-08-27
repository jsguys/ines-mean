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
* 2015: Ankündigung von AngularJS 2

## Scope

* Angular Service: $scope
* Gültig im aktuellen Bereich
* Singleton innerhalb eines Bereichs


## Directives

* Logik durch HTML Attribute (*ng-**) und Tags
* Trennung von Logik & HTML


## Beispiel: Directives

```html
<html ng-app="ines">
  <div ng-show="true">
    <p>Hello World!</p>
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

## Two-Way Data Binding

* Aktualisierung von Inhalten
* Reaktion auf User
* Erkennung durch $scope
* Dirty Checking


## Two-Way Data Binding

![Bild](https://angularjs.de/assets/figures/binding-types-c6d3761feda6211a53fd9260194faf23a6caa7d5d47fb29c64b80147402d0ff0.png)


## Demo: Two-Way Data Binding

* demo mit form

```javascript
// demoController.js
angular.module('presentation').controller('DemoController', [
  '$scope',
  function ($scope) {
    $scope.model = {
      name: ''
    };
});
```

```html
<!-- demo.html -->
<div ng-controller="DemoController as demoCtrl" class="demo angular">
  <form name="demo-form" ng-submit="return false;">
    <label for="user">Hallo {{model.name}}!</label>
    <br>
    <input id="user" name="user" placeholder="Name!" ng-model="model.name">
  </form>
</div>
```


## Dependency Injection

* Einfache Einbindung von Modulen
* Hoche Wiederverwertung
* Instanziierung durch Injector
* Abstraktion und Testbarkeit


## Beispiel: Dependency Injection

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


## Vor- & Nachteile

#### Pro
* Modular
* Trennung Logik & Templates
* Testbar
* Two-way data binding

#### Con
* Angular 2
* Lernkurve
* Komplexität


## Vergleich zu HTML & jQuery

* Wiederverwendung
* Keine DOM-Manipulation
* Single-Page-Apps


## Zukunft / Ausblick

* Große Beliebtheit
* Große Community + Google

* AngularJS 2 mit neuer Basis
