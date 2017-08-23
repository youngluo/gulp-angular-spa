const { Task, config } = global.Eagle;
const { gulp, plugins: $ } = global;

class JsTask extends Task {
  /**
   *
   * @param {string} name
   * @param {object} paths
   * @param {object} options
   * @param {boolen} isConcat Decide whether to concat files
   */
  constructor(name, paths, options, isConcat) {
    super(name, null, paths);
    this.options = options;
    this.isConcat = isConcat;
  }

  gulpTask() {
    return (
      gulp
        .src(this.src.path)
        .pipe(this.initSourceMaps())
        .pipe(this.compile())
        .on('error', this.onError())
        .pipe(this.concat())
        .pipe(this.minify())
        .on('error', this.onError())
        .pipe(this.removePath())
        .pipe(this.writeSourceMaps())
        .pipe(this.save(gulp))
    );
  }

  registerWatchers() {
    this
      .watch(this.src.path)
      .ignore(this.output.path);
  }

  compile() {
    const name = this.name.replace('In', '');
    const plugin = $[name];

    if (!plugin) {
      return this.stream();
    }

    return plugin(config.js[name].pluginOptions);
  }
}

module.exports = JsTask;
