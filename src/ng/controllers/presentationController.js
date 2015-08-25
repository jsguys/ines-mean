angular.module('presentation').controller('PresentationController', [
  'WebSocket', '$scope', '$http', '$filter',
  function (WebSocket, $scope, $http, $filter) {
    var self = this;

    $scope.chapters = [];
    $scope.listeners = 0;
    $scope.page = {};
    $scope.presentation = {};
    $scope.numberOfPages = 0;
    $scope.currentPage = 0;

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

    self.updateNumberOfPages = function (pages) {
      $scope.numberOfPages = pages;
    };

    self.updateCurrent = function (current) {
      $scope.currentPage = current;
    };

    self.updateProgressBar = function () {
      if ($scope.numberOfPages !== 0) {
        var percent = ($scope.currentPage / $scope.numberOfPages) * 100;
        document.getElementById('progress-bar').style.width = percent + '%';
      }
    };

    self.formatDate = function (date) {
      return $filter('date')(date, 'dd. MMM yyyy');
    };

    WebSocket.init(self);
  }
]);
