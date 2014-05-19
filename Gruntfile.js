/*
 * grunt-ractive-parse
 * https://github.com/alisonailea/grunt-ractive-parse
 *
 * Copyright (c) 2014 Alison Stump
 * Licensed under the MIT license.
 */
(function () {
  'use strict';
  module.exports = function (grunt) {
    
    grunt.initConfig({
      pkg: {
        name: 'grunt-ractive-parse'
      },
      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: [
          'Gruntfile.js',
          'tasks/*.js'
          // '<%= nodeunit.tests %>'
        ]
      },
      clean: {
        test: [
          'test/tmp'
        ]
      },
      // nodeunit: {
      //   tests: ['test/*_test.js']
      // },
      ractiveParse: {
        options: {
          appName: 'MyApp',
          type: 'extjs'
        },
        ractive: {
          src: 'test/templ/*.html',
          dest: 'test/tmp/templates.js'
        }
      }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-internal');

    grunt.registerTask('mkdir', grunt.file.mkdir);
    grunt.registerTask('test', [
      'clean',
      'mkdir:test/tmp',
      'ractiveParse',
      // 'nodeunit',
      'clean'
    ]);

    grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);
    // grunt.registerTask('default', ['ractiveParse']);
  };
}());