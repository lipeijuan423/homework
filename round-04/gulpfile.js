const gulp = require("gulp");
const watch = require("gulp-watch");
const babel = require("gulp-babel");
const entry = "./src/server/**/*.js";
const rollup = require("gulp-rollup");
const replace = require("rollup-plugin-replace");
const cleanEntry  = "./src/server/config/index.js";

function builddev(){
    return watch(entry, {ignoreInitial: false}, function(){
        gulp.src(entry)
                .pipe(babel({
                    babelrc: false,
                    "plugins": ["@babel/plugin-transform-modules-commonjs"]
                })).pipe(gulp.dest('dist'));
                // pipe(gulp.dest('dist')); 放里面可能不会被watch  放外面不会被编译   === 异步
    })
}
function buildprod () {
    // rollup - 流清洗
    return gulp.src(entry)
        .pipe(babel({
            babelrc: false,
            ignore:[cleanEntry],
            "plugins": ["@babel/plugin-transform-modules-commonjs"]
        }))
        .pipe(gulp.dest('./dist'));
}
function buildconfig () {
    return gulp.src(entry)
        .pipe(rollup({
            output: {
                format: 'cjs'
            },
            input: cleanEntry,
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify("production")
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
}
function lint() {}
let build = gulp.series(builddev);
if (process.env.NODE_ENV == "production") {
    build = gulp.series(buildprod, buildconfig);
}
if (process.env.NODE_ENV == "lint") {
    build = gulp.series(lint);
}
gulp.task("default", build);