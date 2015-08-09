var fs =   require('fs');
var gulp = require('gulp');

// require all tasks under the ./gulp directory
fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
  require('./gulp/' + task);
});

gulp.task('dev', ['build', 'server'], function () {
  gulp.watch('src/ng/**/*.js', ['build-js']);
  gulp.watch('src/sass/**/*.scss', ['build-sass']);
});

gulp.task('build', ['build-js', 'build-sass']);
