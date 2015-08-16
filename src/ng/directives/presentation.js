angular.module('presentation').directive('presentation', function ($compile) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      scope.$watch('presentation', function (presentation) {
        if (presentation && presentation.template) {
          var template = $compile(presentation.template)(scope);
          element.replaceWith(template);
        }
      });
    }
  };
});
