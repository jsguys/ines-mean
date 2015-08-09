angular.module('presentation').controller('RemoteController', [
  'WebSocket', '$scope',
  function (WebSocket, $scope) {
    var self = this;

    WebSocket(self);

    self.key = null;

    self.login = function () {
      if (null === self.key) {
        console.log('started remote');
        WebSocket.socket.emit('remote', {});
      }
    };

    self.next = function () {
      WebSocket.socket.emit('navigation', {
        key: self.key,
        type: 'next'
      });
    }

    self.setKey = function (key) {
      self.key = key;
    };
  }
]);
