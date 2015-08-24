angular.module('presentation').controller('PresentationController', [
  'WebSocket', '$scope', '$http', '$filter',
  function (WebSocket, $scope, $http, $filter) {
    var self = this;

    $scope.chapters = [];
    $scope.listeners = 0;
    $scope.page = {};
    $scope.presentation = {};

    self.setChapters = function (data) {
      $scope.chapters = data.chapters;
    };

    self.setListeners = function (data) {
      $scope.listeners = data.listeners;
    };

    self.updatePage = function (page) {
      $scope.page = page;
    };

    self.updatePresentation = function (presentation) {
      $scope.presentation = presentation;
    };

    self.formatDate = function (date) {
      return $filter('date')(date, 'dd. MMM yyyy');
    };

    WebSocket.init(self);
  }
]);
