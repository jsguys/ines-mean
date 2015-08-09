angular.module('presentation').directive('page', function () {
  return {
    restrict: 'EA',
    template: '<div ng-include="pagePath"></div>'
  }
});