var gulp      = require('gulp');
var rimraf    = require('gulp-rimraf');

// TODO: make one task to rule them all and call the shit needed
function cleanCjs () {
    // return gulp.src('./dist/cjs/**/*.*', { read: false })
    //     .pipe(rimraf({force:true}))
    //     // For some reason I need to add a dest, or no end is triggered
    //     .pipe(gulp.dest('./dist/cjs/'));
}

// TODO: make one task to rule them all and call the shit needed
const copyPkgToCjs = (config) => () => {
    return gulp.src('./package.json').pipe(gulp.dest(config.paths.dest.cjs));
}

const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json', {
    allowJs: true,
    typescript: require('typescript')
});

// TODO: This should be the task that calls the other functions waiting on them

const buildCjs = (config) => () => {
    return gulp.src(config.paths.src.ts)
        .pipe(tsProject())
        .pipe(gulp.dest(config.paths.dest.cjs))

}

module.exports = function (config) {
    return {
        cleanCjs,
        copyPkgToCjs: copyPkgToCjs(config),
        buildCjs: buildCjs(config)
    };
}

