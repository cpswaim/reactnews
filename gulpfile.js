var gulp = require('gulp'),
    react = require('gulp-react'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    buildFolder = 'build/';

var paths = {
    css: {
        dev: [
            'bower_components/bootstrap-material-design/dist/css/material-fullpalette.min.css',
            'bower_components/bootstrap-material-design/dist/css/material.min.css',
            'bower_components/bootstrap-material-design/dist/css/ripples.min.css',
            'bower_components/bootstrap-material-design/dist/css/roboto.min.css',
            'src/css/**/*.css'
        ],
        dist: [
            'bower_components/bootstrap-material-design/dist/css/material-fullpalette.min.css',
            'bower_components/bootstrap-material-design/dist/css/material.min.css',
            'bower_components/bootstrap-material-design/dist/css/ripples.min.css',
            'bower_components/bootstrap-material-design/dist/css/roboto.min.css',
            'src/css/**/*.css'
        ]
    },
    js: {
        dev: [
            'bower_components/firebase/firebase-debug.js',
            'bower_components/react/react.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap-material-design/dist/js/material.js',
            'bower_components/bootstrap-material-design/dist/js/ripples.js',
            'src/scripts/**/*.js'
        ],
        dist: [
            'bower_components/firebase/firebase.js',
            'bower_components/react/react.min.js',
            'bower_components/bootstrap-material-design/dist/js/material.min.js',
            'bower_components/bootstrap-material-design/dist/js/ripples.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'src/scripts/**/*.js'
        ]
    },
    fonts: {
        dev: [
            'bower_components/bootstrap-material-design/dist/fonts/**/*'
        ],
        dist: [
            'bower_components/bootstrap-material-design/dist/fonts/**/*'
        ]
    },
    assets: {
        dev: [
            'src/assets/**/*'
        ],
        dist: [
            'src/assets/**/*'
        ]
    }
};

gulp.task('default', ['build', 'watch', 'connect']);

gulp.task('build', ['html', 'js', 'css']);

gulp.task('dist', ['html', 'minify-js', 'css']);

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

gulp.task('css', ['fonts', 'assets'], function() {
    return gulp.src(paths.css.dev)
        .pipe(gulp.dest(buildFolder+'/css'))
        .pipe(notify("Moving CSS files..."))
        .pipe(connect.reload());
});

gulp.task('fonts', function() {
    return gulp.src(paths.fonts.dev)
        .pipe(gulp.dest(buildFolder+'/fonts'))
        .pipe(notify("Moving Font files..."))
        .pipe(connect.reload());
});

gulp.task('assets', function() {
    return gulp.src(paths.assets.dev)
        .pipe(gulp.dest(buildFolder+'/assets'))
        .pipe(notify("Moving assets..."))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    var watchJS = gulp.watch('src/**/*.js', ['js']),
        watchHTML = gulp.watch('src/**/*.html', ['html']),
        watchCSS = gulp.watch('src/**/*.css', ['css']);
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