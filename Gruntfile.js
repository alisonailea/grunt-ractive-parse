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
          dest: 'test/tmp/app/templates.js'
        },

        ractiveExt: {
          options: {
            appName: 'MyApp',
            type: 'extjs',
            ignorePath: 'test/tmp/app',
            clsConfig: {
              'singleton' : true
            }
          },
          src: 'test/templ/*',
          dest: 'test/tmp/app/extTemplates.js'
        }
      }
    });

    // Load Grunt tasks for testing and such
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.registerTask('mkdir', grunt.file.mkdir);
    grunt.registerTask('test', [
      'clean',
      'mkdir:test/tmp/app',
      'ractiveparse',
      'nodeunit',
      'clean'
    ]);

    grunt.registerTask('default', ['jshint', 'test']);
  };
}());
