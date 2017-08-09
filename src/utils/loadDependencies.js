let { Eagle } = global;

/**
 * This object stores all of the various gulp tasks.
 */
Eagle.mixins = {};

/**
 * The gulp-eagle configuration object.
 */
Eagle.config = require('../config');

/**
 * A logger singleton for use in various tasks.
 */
Eagle.log = new (require('./Log'));

/**
 * This class determines the proper src and
 * output paths for any given task.
 */
Eagle.GulpPaths = require('./GulpPaths');

/**
 * The tasks array stores all tasks that should be executed each time
 * you trigger Gulp from the command line.
 */
Eagle.tasks = [];

/**
 * Each Gulp task is stored as a Task instance.
 */
Eagle.Task = require('../tasks/Task');

Eagle.checkOptions = require('./checkOptions');

Eagle.Notification = require('./Notification');
