var gulp = require('gulp');
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');
// var rollupNodeResolve = require('rollup-plugin-node-resolve');

module.exports = function (config) {
    return function () {
        return rollup({
                entry: './dist/es6/main.js',
                format: 'iife',
                // plugins: [
                //     rollupNodeResolve({
                //         jsnext: true,
                //     }),
                // ]
            })
            .pipe(source('pleier.js'))
            .pipe(gulp.dest('./dist/cjs/bundles'));
    };
}

