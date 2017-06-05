const gulp      = require('gulp'),
      concat    = require('gulp-concat'),
      prefix    = require('gulp-autoprefixer'),
      uglify    = require('gulp-uglify'),
      minifycss = require('gulp-minify-css'),
      rimraf    = require('gulp-rimraf'),
      rename    = require('gulp-rename'),
      replace   = require('gulp-replace');

const fs = require('fs');

const options = JSON.parse(fs.readFileSync ('.env'));
const config = require('./gulp/configuration');

// CJS
var {cleanCjs, copyPkgToCjs, buildCjs} = require('./gulp/tasks/cjs/build-cjs')(config);
gulp.task('cjs-clean', cleanCjs);
gulp.task('cp-package-cjs', ['cjs-clean'], copyPkgToCjs);
gulp.task('build-cjs', ['cp-package-cjs'], buildCjs);


// ES6
var {cleanES6, buildES6} = require('./gulp/tasks/es6/build-es6')(config);
gulp.task('es6-clean', cleanES6);
gulp.task('build-es6', ['es6-clean'], buildES6);

// var bundleroll = require('./gulp/tasks/bundle/rollup');
// gulp.task('bundle-es6', ['build-es6'], bundleroll());

// SystemJs
var {cleanSystem, buildSystem} = require('./gulp/tasks/systemjs/build-systemjs')(config);
gulp.task('system-clean', cleanSystem);
gulp.task('build-system', ['system-clean'], buildSystem);


// Angular Templates
var {processTemplates, buildTemplatesInSystemJs} = require('./gulp/tasks/html/angular-templatecache')(config);
gulp.task('process-templates', processTemplates);
gulp.task('process-templates-with-system', ['process-templates'], buildTemplatesInSystemJs);

//gulp.task('process-scripts-with-tpl',['process-templates'], function() {
gulp.task('process-scripts-with-tpl', ['process-templates-with-system', 'build-system'], function () {
    //
    return gulp.src(['./dist/cjs/bundles/pleier.system.js', './dist/templates.system.js'])
        .pipe(concat('pleier-tpl.system.js'))
        .pipe(replace('/*!--TEMPLATE-DEPENDENCIES--*/',',\'pleierTpls\''))
        .pipe(gulp.dest('./dist/cjs/bundles'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/cjs/bundles'));
});


gulp.task('process-styles', function() {
    return gulp.src('./assets/**/*.css')
        .pipe(concat('pleier.css'))
        .pipe(prefix('last 2 version'))
        .pipe(gulp.dest('./dist'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/cjs'));
});


gulp.task('build', ['process-scripts-with-tpl', 'build-cjs', 'process-styles']);

gulp.task('watch', function() {
    // This should be process script, but for some reason is not updating :(
    gulp.watch('./pleier/**/*.ts', ['build']);
    gulp.watch('./pleier/**/*.html', ['build']);
    gulp.watch('./demo/**/*.html', ['build']);
    // gulp.watch('./src/**/*.js', ['docs']);

    gulp.watch('./assets/**/*.css', ['process-styles']);
    // gulp.watch('./demo/**/*', ['docs']);
    // gulp.watch(['./docs/**/*', '!./docs/custom-generator/bower_components/**'], ['docs']);
});


// gulp.task('default', ['process-scripts-with-tpl', 'process-styles', 'docs','watch']);
gulp.task('default', ['build', 'process-styles', 'watch']);
