var gulp =       require('gulp');
var concat =     require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify =     require('gulp-uglify');

gulp.task('build-js', function () {
  gulp.src(['src/ng/module.js', 'src/ng/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      //.pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});
