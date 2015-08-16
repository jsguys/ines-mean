angular.module('presentation').directive('page', function ($compile) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      scope.$watch('page', function (page) {
        if (page && page.template) {
          var template = $compile(page.template)(scope);
          element.replaceWith(template);
        }
      });
    }
  };
});
