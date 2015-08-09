angular.module('presentation').controller('PresentationController', [
  'WebSocket', '$scope', '$http',
  function (WebSocket, $scope, $http) {
    var self = this;

    self.page = {
      number: -1,
      title: 'Title',
      content: null
    };
    self.title = 'Presentation title';
    self.listeners = 0;

    $scope.layoutPath = '';

    self.setPresentation = function (data) {
      $scope.layoutPath = '/data/layouts/' + data.presentation + '.html';
      self.page.number = data.page;
      self.title = data.title;

      self.nextPage(data.page);
    };

    self.nextPage = function (page) {
      if (undefined === page) {
        self.page.number++;   
      }
      else {
        self.page.number = page;
      }

      $scope.pagePath = '/data/pages/' + self.page.number + '.html';
    }

    WebSocket(self);
  }
]);
