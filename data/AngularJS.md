# AngularJS

## Was ist AngularJS

* Frontend Framework
* Google
* MVW

## Expressions

```html
<p>4 + 4 = {{ 4 + 4 }}</p>
```

## Directives

* Logik durch Attribute (*ng-**) und Tags
* Trennung Logik & HTML

```html
<html ng-app="ines">
  <div ng-show="true">
    <p>Hello World</p>
  </div>
</html>
```

## 2 way data-binding

* Aktualisierung von Inhalten
* Reaktion auf User

---

* demo mit form

## Dependency Injection

* Einfache Einbindung von Modlen

```javascript
app.controller('MyController', [
  '$scope', '$http',
  function ($scope, $http) {
    // accessible modules $scope and $http
  }
]);
```

## Promises

* Erfolgserwartung statt Prüfung
* Klarere Struktur / weniger Schachtelungen

```javascript
$http.get('/coolpage')
  .then(function (result) {
    // handle result on success
  })
  .then(function (error) {
    // handle error on failure (optional)
  });
```

## Tests

## Think tank

* Kleines interaktives Spiel
** Luftballons schweben durchs Bild, drauf klicken gibt einen Punkt

## Vergleich zu HTML & jQuery

* Wiederverwendung
* Bessere Aufteilung
* Trennung Logik & Template
* Keine DOM-Manipulation

## Zukunft / Ausblick

* Große Beliebtheit

* AngularJS 2 mit neuem Standard
