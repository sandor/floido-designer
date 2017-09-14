var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var umd = require('gulp-umd');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var protractor = require('gulp-protractor').protractor;

var webdriver_standalone = require('gulp-protractor').webdriver_standalone;
var webdriver_update = require('gulp-protractor').webdriver_update;
gulp.task('webdriver_standalone', webdriver_standalone);
gulp.task('webdriver_update', webdriver_update);

gulp.task('test', ['webdriver_update'], function() {
  return new Promise(function(resolve, reject) {
    connect.server({ port: 8000 });
    // Called when the tests either complete or error
    // This function will kill the server and tell the gulp process
    // to either abort (if tests failed) or carry on
    function handleEnd(err) {
      connect.serverClose();
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    }
    gulp.src(['**/*-spec.js'])
      .pipe(protractor({
          configFile: 'protractor.conf.js',
          args: ['--baseUrl', 'http://127.0.0.1:8000']
      }))
      .on('error', handleEnd)
      .on('close', handleEnd);
  });
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('build', ['clean', 'test'], function() {
  return gulp.src([
      'src/modules/ce-bind.module.js',
      'src/directives/ce-interpolated/ce-interpolated.directive.js',
      'src/directives/ce-one-way/ce-one-way.directive.js'
    ])
    .pipe(concat('ce-bind.js'))
    .pipe(umd({
      dependencies: function(file) {
        return [{ name: 'angular' }];
      },
      exports: function(file) {
        return "'robdodson.ce-bind'";
      },
      namespace: function(file) {
        return 'returnExports';
      }
    }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('ce-bind.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);