angular.module('presentation').controller('RemoteController', [
  'WebSocket', '$scope',
  function (WebSocket, $scope) {
    var self = this;

    var MODE_DENIED = 'denied';
    var MODE_LISTENER = 'listener';
    var MODE_LOGIN = 'login';
    var MODE_REMOTE = 'remote';

    WebSocket(self);

    self.password = null;
    self.key = null;

    self.mode = MODE_LISTENER;

    self.login = function () {
      if (null === self.key) {
        WebSocket.sendRemoteRequest({
          password: self.password
        });
      }
    };

    $scope.start = function (data) {
      if (data.success) {
        self.key = data.key;
        self.mode = MODE_REMOTE;
      }
      else {
        self.mode = MODE_DENIED;
      }
    };

    // page change triggers
    self.nextPage = function () {
      WebSocket.sendNextPage();
    };
    self.previousPage = function () {
      WebSocket.sendPreviousPage();
    }

    // state methods
    self.isActive = function () {
      return (MODE_LISTENER !== self.mode);
    }
    self.isConnected = function () {
      return (MODE_REMOTE === self.mode);
    }
    self.isDenied = function () {
      return (MODE_DENIED === self.mode);
    }
    self.isLogin = function () {
      return (MODE_LOGIN === self.mode);
    }
  }
]);
