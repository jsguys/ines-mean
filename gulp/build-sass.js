var gulp =      require('gulp');
var concat =    require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var sass =      require('gulp-sass');

gulp.task('build-sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/css'));
});
