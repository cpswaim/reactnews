var gulp = require('gulp'),
    react = require('gulp-react'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    buildFolder = 'build/';

var paths = {
    js:{
        dev: [
            'bower_components/firebase/firebase-debug.js',
            'bower_components/react/react.js',
            'src/**/*.js'
        ],
        dist: [
            'bower_components/firebase/firebase.js',
            'bower_components/react/react.min.js',
            'src/**/*.js'
        ]
    }
};

gulp.task('default', ['build', 'watch', 'connect']);

gulp.task('build', ['html', 'js']);

gulp.task('dist', ['html', 'minify-js']);

gulp.task('js', function() {
    return gulp.src(paths.js.dev)
        .pipe(react())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(buildFolder))
        .pipe(notify("Recompiling JS files..."))
        .pipe(connect.reload());
});

gulp.task('minify-js', function() {
    return gulp.src(paths.js.dist)
        .pipe(react())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildFolder))
        .pipe(notify("Recompiling JS files..."));
});

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest(buildFolder))
        .pipe(notify("Moving HTML files..."))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    var watchJS = gulp.watch('src/**/*.js', ['js']),
        watchHTML = gulp.watch('src/**/*.html', ['html']);
});

gulp.task('clean', function() {
    return gulp.src(buildFolder, {
            read: false
        })
        .pipe(clean())
        .pipe(notify("Cleaning build folder..."));
});
 
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 8001,
    livereload: true
  });
});