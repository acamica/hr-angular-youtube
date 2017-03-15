
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
