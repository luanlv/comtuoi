'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});


gulp.task('sassAdmin', function () {
  return gulp.src('./sassAdmin/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});


gulp.task('default',['sass','sassAdmin'], function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./sassAdmin/**/*.scss', ['sassAdmin']);
});
