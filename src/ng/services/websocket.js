angular.module('presentation').factory('WebSocket', [
  '$q', '$scope', '$rootScope',
  function($q, $scope, $rootScope) {
    var socket = io.connect(window.location.origin);

    var service = {};

    service.init = function (controller) {
      socket.on('page', function (data) {
        console.log('received page', data);
        controller.updatePage(page);
        $rootScope.$apply();
      });

      socket.on('presentation', function (data) {
        console.log('received welcome', data);
        $scope.updatePresentation(data);
        $rootScope.$apply();
      });

      socket.on('chapter', function (data) {
        console.log('received chapter', data);
        controller.setChapters(data);
        $rootScope.$apply();
      });

      socket.on('listener', function (data) {
        console.log('received listener', data);
        controller.setListeners(data);
        $rootScope.$apply();
      });
    };

    socket.on('remote', function (data) {
      console.log('received remote', data);
      $scope.start(data);
      $rootScope.$apply();
    })

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
