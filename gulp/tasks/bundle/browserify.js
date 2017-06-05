var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
const rxjsExclude = [
    'rxjs/add/observable/fromPromise',
    'rxjs/add/observable/fromEventPattern',
    'rxjs/add/observable/fromEvent',
    'rxjs/add/observable/of',
    'rxjs/add/observable/merge',
    'rxjs/add/observable/throw',
    'rxjs/add/observable/empty',
    'rxjs/add/observable/interval',
    'rxjs/add/operator/map',
    'rxjs/add/operator/mapTo',
    'rxjs/add/operator/merge',
    'rxjs/add/operator/scan',
    'rxjs/add/operator/withLatestFrom',
    'rxjs/add/operator/filter',
    'rxjs/add/operator/switchMap',
    'rxjs/add/operator/catch',
    'rxjs/add/operator/startWith',
    'rxjs/add/operator/toPromise',
    'rxjs/add/operator/distinctUntilChanged',
    'rxjs/add/operator/delay',
    'rxjs/add/operator/take',
    'rxjs/add/operator/takeUntil',
    'rxjs/add/operator/last',
    'rxjs/add/operator/do',
    'rxjs/add/operator/publishReplay',
    'rxjs/add/operator/multicast'
];

module.exports = function (config) {
    return function () {
        const b = browserify({
            entries: './dist/cjs/main.js',
            debug: true,
            external: 'angular'
        });
        b.external(['angular']);
        b.external(rxjsExclude);
        return b.bundle()

        // give the file the name you want to output with
        .pipe(source('pleier.js'))

        // and output to ./dist/app.js as normal.
        .pipe(gulp.dest('./dist/cjs/bundles'));
    }
};

