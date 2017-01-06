var gulp = require('gulp'),
    Eagle = require('../index'),
    _ = require('lodash'),

    $ = Eagle.plugins,
    bs = Eagle.BS,
    config = Eagle.config;

Eagle.extend('style', function (src, output, options) {
    var params = Eagle.methods.processParams(src, output, options),
        options = params.options,
        paths = new Eagle.GulpPaths().src(params.src).output(params.output);

    new Eagle.Task('style', function () {
            this.log(paths.src, paths.output);

            return gulp.src(paths.src.path, {
                    base: options.base
                })
                .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
                .pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
                .pipe($.if(config.production, $.cssnano(config.css.cssnano.pluginOptions)))
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe($.if(options.removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe($.if(config.production, new Eagle.Notification('Style Compressd!')))
                .on('end', bs.reload)
        })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});