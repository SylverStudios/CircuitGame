var gulp = require('gulp');
var webpack = require('webpack-stream');
var $ = require('gulp-load-plugins')();
var webpackConfig = require('./webpack.config.js');

// pull the build environment from the '--type <foo>' arg
var environment = $.util.env.type || 'development';

// base directories
var dist = 'build/';
var src = 'src/'

// content of webpack task (task name is 'scripts')
function doWebpack(config) {
  return gulp.src(config.entry)
    .pipe(webpack(config))
    .pipe(environment === 'production' ? $.uglify() : $.util.noop())
    .pipe(gulp.dest(dist))
    .pipe($.size({title: 'js'}));
}

// content of scss compile task (task name is 'scss')
function doSsss() {
  return gulp.src(src + 'scss/main.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest(dist))
    .pipe($.size({title: 'css'}));
}

// define webpack task
gulp.task('scripts', function () {
  return doWebpack(webpackConfig(environment));
});

// define scss compile task
gulp.task('scss', function () {
  return doScss();
});

// define convenience build task for compiling both js and scss
gulp.task('build', ['scripts', 'scss']);

// watch for changes in js or scss, recompile
gulp.task('watch', function () {
  var config = webpackConfig(environment);
  config.watch = true; // webpack has its own watch process
  doWebpack(config);

  doScss();
  gulp.watch(src + 'scss/**/*.scss', ['scss']); // define our own scss compile watch process
});
