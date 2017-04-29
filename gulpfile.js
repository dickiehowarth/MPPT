const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function () {
    // node source
    gulp.src("src/*.js")
      .pipe(babel())
      .pipe(gulp.dest("dist"));
});

gulp.task('test', function () {
    // node source
    gulp.src("src/test/*.js")
      .pipe(babel())
      .pipe(gulp.dest("dist/test"));
});