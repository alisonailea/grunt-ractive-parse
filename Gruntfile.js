/*
 * grunt-ractive-parse
 * https://github.com/alisonailea/grunt-ractive-parse
 *
 * Copyright (c) 2014 Alison Stump, contributors
 * Licensed under the MIT license.
 */

(function () {
  'use strict';
  module.exports = function (grunt) {
    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      pkg: {
        name: 'grunt-ractive-parse'
      },
      // JS Linting
      jshint: {

        all: [
          'Gruntfile.js',
          'tasks/*.js',
          '<%= nodeunit.tests %>'
        ]
      },
      // Clean folders before test/build
      clean: {
        test: [
          'test/tmp'
        ]
      },
      // Unit Testing
      nodeunit: {
        tests: ['test/*_test.js']
      },
      // Ractive Parse
      ractiveparse: {
        ractiveDefault:{
          options: {
            appName: 'MyApp'
          },
          src: 'test/templ/*',
          dest: 'test/tmp/templates.js'
        },

        ractiveExt: {
          options: {
            appName: 'MyApp',
            type: 'extjs'
          },
          src: 'test/templ/*',
          dest: 'test/tmp/extTemplates.js'
        }
      }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.registerTask('mkdir', grunt.file.mkdir);

    grunt.registerTask('test', [
      'clean',
      'mkdir:test/tmp',
      'ractiveparse',
      'nodeunit',
      'clean'
    ]);

    grunt.registerTask('default', ['jshint', 'test']);
  };
}());
