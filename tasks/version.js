var fs = require('fs'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    gulp = require('gulp'),
    Eagle = require('../index'),
    $ = Eagle.plugins,
    config = Eagle.config;

Eagle.extend('version', function (src) {
    var paths = new Eagle.GulpPaths().src(src).output();

    new Eagle.Task('version', function () {
        this.log(paths.src, paths.output);

        var files = vinylPaths();

        delBuildHashFiles();

        return (
            gulp.src(paths.src.path)
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(files)
            .pipe($.rev())
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe($.rev.manifest())
            .pipe(gulp.dest(paths.output.baseDir))
            .on('end', function () {
                del(files.paths, {
                    force: true
                });
            })
        );
    })
});

function delBuildHashFiles() {
    var manifest = config.buildPath + '/rev-manifest.json';

    fs.stat(manifest, function (err, stat) {
        if (!err) {
            manifest = JSON.parse(fs.readFileSync(manifest));

            for (var key in manifest) {
                del.sync(config.buildPath + '/' + manifest[key], {
                    force: true
                });
            }
        }
    });
};