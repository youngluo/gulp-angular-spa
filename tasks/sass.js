var gulp = require('gulp'),
    Eagle = require('../index'),
    _ = require('lodash'),

    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('sass', function (src, output, options) {
    var params = Eagle.methods.processParams(src, output, options),
        options = params.options,
        paths = new Eagle.GulpPaths().src(params.src).output(params.output);

    new Eagle.Task('sass', function () {
            return gulpTask.call(this, paths, options)
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe($.if(options.removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Eagle.Notification('Sass Compiled!'))
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});

Eagle.extend('sassIn', function (src, output) {
    var params = Eagle.methods.processParams(src, output),
        options = params.options,
        paths = new Eagle.GulpPaths().src(params.src).output(params.output);

    new Eagle.Task('sassIn', function () {
            return gulpTask.call(this, paths, options)
                .pipe($.concat(paths.output.name))
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Eagle.Notification('Sass Merged!'))
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});

function gulpTask(paths, options) {
    this.log(paths.src, paths.output);

    return (
        gulp.src(paths.src.path, {
            base: options.base
        })
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe($.sass(config.css.sass.pluginOptions))
        .on('error', function (e) {
            new Eagle.Notification().error(e, 'Sass Compile Failed');
            this.emit('end');
        })
        .pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
    )
}