const gulp      = require('gulp');
const rimraf    = require('gulp-rimraf');
const ts = require('gulp-typescript');
// TODO: make one task to rule them all and call the shit needed
const cleanES6 = (config) => () => {
    return gulp.src(config.paths.dest.es6 + '/**/*.*', { read: false })
        .pipe(rimraf({force:true}))
        // For some reason I need to add a dest, or no end is triggered
        .pipe(gulp.dest(config.paths.dest.es6));
}

const tsProject = ts.createProject('tsconfig.json', {
    target: 'es6',
    module: 'es2015',
    typescript: require('typescript')
});

// TODO: This should be the task that calls the other functions waiting on them
const buildES6 = (config) => () => {
    return gulp.src(config.paths.src.ts)
        .pipe(tsProject())
        .pipe(gulp.dest(config.paths.dest.es6))
}

module.exports = function (config) {
    return {
        cleanES6: cleanES6(config),
        buildES6: buildES6(config)
    };
}

