var templateCache   = require('gulp-angular-templatecache');
var gulp            = require('gulp');

var toPromise = require('../../helpers/to-promise');

var path = require("path");
var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
function buildTemplatesInSystemJs () {
    var builder = new Builder('./dist');
    // Make sure angular isn't added to the list
    builder.invalidate('angular');
    // Bundle pleierTpls as a systemjs module
    return builder.bundle('[pleier-tpls.system.js]', './dist/templates.system.js');

}

function processTemplates() {
    var system$ = gulp.src('./pleier/**/*.html')
        .pipe(templateCache({
            root: '/template',
            module: 'pleierTpls',
            standalone: true,
            moduleSystem: 'ES6',
            filename: 'pleier-tpls.system.js'
        }))
        // .pipe(concat('templates.js'))
        .pipe(gulp.dest('./dist/'));

    var global$ =  gulp.src('./pleier/**/*.html')
        .pipe(templateCache({
            root: '/template',
            module: 'pleierTpls',
            standalone: true,
            filename: 'pleier-tpls.global.js'
        }))
        // .pipe(concat('templates.js'))
        .pipe(gulp.dest('./dist/'));
    return Promise.all([system$, global$].map(toPromise));
}

module.exports = function (config) {
    return {processTemplates, buildTemplatesInSystemJs};
}
