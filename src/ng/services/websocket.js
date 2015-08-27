angular.module('presentation').factory('WebSocket', [
  '$q', '$rootScope',
  function($q, $rootScope) {
    var socket = null;

    var service = {};

    service.init = function (controller) {
      if (null === socket) {
        socket = io.connect(window.location.origin);
      }

      socket.on('page', function (data) {
        if (data) {
          controller.updatePage(data.page);
          controller.updateCurrent(data.current);
          controller.updateProgressBar();
          $rootScope.$apply();
        }
      });

      socket.on('presentation', function (data) {
        controller.updatePresentation(data);
        $rootScope.$apply();
      });

      socket.on('chapter', function (data) {
        controller.setChapters(data);
        $rootScope.$apply();
      });

      socket.on('listeners', function (data) {
        controller.setListeners(data);
        $rootScope.$apply();
      });

      socket.on('numberOfPages', function (data) {
        controller.updateNumberOfPages(data);
        controller.updateProgressBar();
        $rootScope.$apply();
      });
    };

    service.sendLogin = function () {
      socket.emit('remote');
    };

    service.sendNextPage = function () {
      socket.emit('navigation', {
        type: 'next'
      });
    };

    service.sendPreviousPage = function () {
      socket.emit('navigation', {
        type: 'previous'
      });
    };

    service.sendRemoteRequest = function (credentials) {
      socket.emit('login', credentials);
    };

    return service;
  }
]);
