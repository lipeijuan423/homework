// server
var gulp = require('gulp');
var jsImport = require('gulp-js-import');
gulp.task('import', function () {
    return gulp.src('./src/web/views/books/list.js').pipe(jsImport()).pipe(gulp.dest('dist'));
})