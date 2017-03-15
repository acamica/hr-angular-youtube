var gulp      = require('gulp');
var rimraf    = require('gulp-rimraf');

// TODO: make one task to rule them all and call the shit needed
function cleanSystem () {
    // return gulp.src('./dist/cjs/bundles/rx-player.js', { read: false })
    //     .pipe(rimraf({force:true}))
    //     // For some reason I need to add a dest, or no end is triggered
    //     .pipe(gulp.dest('./dist/cjs/'));
}

const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json', {
    target: 'es5',
    module: 'system',
    outFile: 'rx-player.system.js',
    // rootDir: 'src',
    typescript: require('typescript')
});

// TODO: This should be the task that calls the other functions waiting on them
const buildSystem = (config) => () => {
    return gulp.src(config.paths.src.ts)
        .pipe(tsProject())
        .pipe(gulp.dest('./dist/cjs/bundles'))
}

module.exports = function (config) {
    return {
        cleanSystem,
        buildSystem: buildSystem(config)
    };
}

