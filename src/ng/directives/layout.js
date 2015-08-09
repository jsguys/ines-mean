angular.module('presentation').directive('layout', function () {
  return {
    restrict: 'EA',
    template: '<div ng-include="layoutPath"></div>'
  };
});
