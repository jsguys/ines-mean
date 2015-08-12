angular.module('presentation').controller('PresentationController', [
  'WebSocket', '$scope', '$http',
  function (WebSocket, $scope, $http) {
    var self = this;

    self.chapters = [];
    self.listeners = 0;
    self.page = {};
    self.presentation = {};

    $scope.layoutPath = '';

    self.setChapters = function (dat) {
      self.chapters = data.chapters;
    };

    self.setListeners = function (data) {
      self.listeners = data.listeners;
    };

    self.updatePage = function (page) {
      self.page = page;

      $scope.pagePath = '/data/pages/' + self.page.number + '.html';
    };

    $scope.updatePresentation = function (presentation) {
      console.log('found presentation', presentation);
      self.presentation = presentation;
      
      $scope.layoutPath = '/data/layouts/' + presentation.presentation + '.html';
    };

    WebSocket.init(self);
  }
]);
