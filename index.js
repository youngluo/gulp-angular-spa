var fs = require('fs'),
    gulp = require('gulp'),
    _ = require('lodash'),
    gutils = require('gulp-util');

/**
 * Create a Eagle constructor.
 * 
 * @param {function} callback
 */

var Eagle = function (callback) {

    // Loading all default tasks.
    require('require-dir')('./tasks');

    callback(Eagle.mixins);

    createGulpTasks.call(Eagle);
}

Eagle.mixins = {};

Eagle.plugins = require('gulp-load-plugins')();

Eagle.Log = require('./Logger');

Eagle.Notification = require('./Notification');

Eagle.GulpPaths = require('./GulpPaths');

Eagle.Task = require('./Task')(Eagle);

Eagle.config = require('./Config');

Eagle.tasks = Eagle.config.tasks;

/**
 * Register a new task with Eagle.
 *
 * @param {string}   name
 * @param {Function} callback
 */

Eagle.extend = function (name, callback) {
    this.mixins[name] = function () {
        callback.apply(this, arguments);

        return this.mixins;
    }.bind(this);
};


function createGulpTasks() {
    this.tasks.forEach(function (task) {
        if (_.includes(gulp.tasks, task.name)) return;

        gulp.task(task.name, function () {
            return task.run();
        });
    });
};

module.exports = Eagle;