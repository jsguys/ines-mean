angular.module('presentation').directive('remote', function () {
  return {
    restrict: 'EA',
    template: '<div ng-include="/templates/remote.html"></div>'
  };
});
