angular.module('presentation').directive('page', function ($compile) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      scope.$watch('page', function (page) {
        if (page && page.templateId) {
          var content = '<div class="page ' + page.templateId.type + '">' + page.templateId.content + '</div>';

          element.html(content);
          $compile(element.contents())(scope);
        }
      });
    }
  };
});
