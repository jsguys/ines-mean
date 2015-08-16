angular.module('presentation').directive('presentation', function ($compile) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      scope.$watch('presentation', function (presentation) {
        if (presentation && presentation.templateId) {
          var template = $compile(presentation.templateId.content)(scope);
          element.replaceWith(template);
        }
      });
    }
  };
});
