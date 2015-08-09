angular.module('presentation').factory('WebSocket', [
  '$q', '$rootScope',
  function($q, $rootScope) {
    var socket = io.connect(window.location.origin);

    var service = function (controller) {
      socket.on('page', function (data) {
        console.log('received page', data);
      });

      socket.on('welcome', function (data) {
        console.log('received welcome', data);
        controller.setPresentation(data);
        $rootScope.$apply();
      });

      socket.on('ninja', function (data) {
        console.log('received ninja', data);
      });

      socket.on('remote', function (data) {
        console.log('received remote', data);
        if (data.success) {
          controller.setKey(data.key);
        }
        else {
          alert(data.message);
        }
      });

      socket.on('next', function (data) {
        console.log('received next');
        controller.nextPage();
        $rootScope.$apply();
      });
    };

    service.socket = socket;

    return service;
  }
]);