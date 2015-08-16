angular.module('presentation').controller('PresentationController', [
  'WebSocket', '$scope', '$http',
  function (WebSocket, $scope, $http) {
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

    WebSocket.init(self);
  }
]);
