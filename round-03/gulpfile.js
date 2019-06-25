// server
var gulp = require('gulp');
// var jsImport = require('gulp-js-import');
var rollup = require('gulp-rollup');
// gulp.task('import', function () {
//     return gulp.src('./src/web/views/books/list.html').pipe(jsImport()).pipe(gulp.dest('dist'));
// })
gulp.task('bundle', function (done) {
    gulp.src('./src/**/*.js').pipe(rollup({
        input: '' ,
        output: {
            format: 'es'
        }
    }))
    .pipe(gulp.dest('./dist'));
    done()
})