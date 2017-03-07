const gulp      = require('gulp'),
      concat    = require('gulp-concat'),
      prefix    = require('gulp-autoprefixer'),
      uglify    = require('gulp-uglify'),
      minifycss = require('gulp-minify-css'),
      rimraf    = require('gulp-rimraf'),
      rename    = require('gulp-rename'),
      html2js   = require('gulp-ng-html2js'),
      replace   = require('gulp-replace');

const fs = require('fs');

const options = JSON.parse(fs.readFileSync ('.env'));

const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json', {
    allowJs: true,
    typescript: require('typescript')
});

gulp.task('process-scripts', function() {
    return gulp.src(['./src/**/*.js', './src/**/*.ts'])
        .pipe(tsProject())
        .pipe(concat('rx-player.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('process-templates', function() {
    return gulp.src('./src/**/*.html')
        .pipe(html2js({
            moduleName: 'rxPlayerTpls',
            prefix :'/template/',
            export: 'commonjs'
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./dist/'));
});
//gulp.task('process-scripts-with-tpl',['process-templates'], function() {
gulp.task('process-scripts-with-tpl', ['process-templates','process-scripts'], function() {
    //
    return gulp.src(['./dist/templates.js','./dist/rx-player.js'])
        .pipe(concat('rx-player-tpl.js'))
        .pipe(replace('/*!--TEMPLATE-DEPENDENCIES--*/',',\'rxPlayerTpls\''))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('process-styles', function() {
    return gulp.src('./assets/**/*.css')
        .pipe(concat('rx-player.css'))
        .pipe(prefix('last 2 version'))
        .pipe(gulp.dest('./dist'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'));
});


const tsDemo = ts.createProject('tsconfig.json', {
    allowJs: true,
    typescript: require('typescript'),
    outDir:"demo/",
    outFile: null
});


gulp.task('demo-cp', function() {
    return gulp.src('./demo/**/*')
        .pipe(gulp.dest(options.pagesDir + '/demo'));

});

gulp.task('docs-dist-cp',['process-scripts-with-tpl', 'process-styles'], function() {
    return gulp.src(['./dist/**/*'])
        .pipe(gulp.dest(options.pagesDir + '/dist'));
});


gulp.task('docs-mddoc', function(cb) {
    var mddoc  = require('mddoc'),
        config = mddoc.config;

    // Load the project settings
    var mddocSettings = config.loadConfig(process.cwd(), {outputDir: options.pagesDir});

    // Run the tool
    mddocSettings.done(function(settings) {
        mddoc.verbose(true);
        mddoc.initialize(settings);

        var steps = [
            mddoc.readMarkdown,
            mddoc.readCode,
            mddoc.saveMetadata,
            mddoc.replaceReferences,
            mddoc.generateOutput
        ];

        mddoc.run(steps).then(function () {
            cb();
        }, function(err) {
            console.error('There was an error running the tool ' + JSON.stringify(err));
            cb(false);
        });
    });
});

gulp.task('docs-clean', function() {
    return gulp.src(options.pagesDir + '/**/*.*', { read: false })
        .pipe(rimraf({force:true}))
        // For some reason I need to add a dest, or no end is triggered
        .pipe(gulp.dest(options.pagesDir));
});

gulp.task('build-docs', ['demo-cp', 'docs-dist-cp', 'docs-mddoc']);

gulp.task('docs',['docs-clean'], function(){
    return gulp.start('build-docs');
});

gulp.task('build', ['process-scripts-with-tpl']);

gulp.task('watch', function() {
    // This should be process script, but for some reason is not updating :(
    gulp.watch('./src/**/*.js', ['process-scripts-with-tpl']);
    gulp.watch('./src/**/*.ts', ['process-scripts-with-tpl']);
    gulp.watch('./src/**/*.html', ['process-scripts-with-tpl']);

    // gulp.watch('./src/**/*.js', ['docs']);

    gulp.watch('./assets/**/*.css', ['process-styles']);
    // gulp.watch('./demo/**/*', ['docs']);
    // gulp.watch(['./docs/**/*', '!./docs/custom-generator/bower_components/**'], ['docs']);
});


// gulp.task('default', ['process-scripts-with-tpl', 'process-styles', 'docs','watch']);
gulp.task('default', ['build', 'process-styles', 'watch']);
