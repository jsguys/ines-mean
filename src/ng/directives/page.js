angular.module('presentation').directive('page', function ($compile) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      scope.$watch('page', function (page) {
        if (page && page.templateId) {
          var template = $compile(page.templateId.content)(scope);
          element.replaceWith(template);
        }
      });
    }
  };
});
