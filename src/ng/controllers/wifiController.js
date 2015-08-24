angular.module('presentation').controller('WifiController', [
  '$http',
  function ($http) {
    var self = this;

    self.wifi = {};

    $http.get('/wifi').then(function (response) {
      self.wifi = response.data;
    });
  }
]);
