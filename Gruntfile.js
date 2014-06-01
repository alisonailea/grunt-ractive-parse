/*
 * grunt-ractive-parse
 * https://github.com/alisonailea/grunt-extjsractive-parse
 *
 * Copyright (c) 2014 Alison Stump
 * Licensed under the MIT license.
 */

'use strict';
var Ractive = require('ractive'),
    chalk = require('chalk'),
    path = require('path');

module.exports = function (grunt) {
  var desc = 'pre-parse Ractive templates for use in MVC projects,',
      templateJson = new Object();
  grunt.registerMultiTask('ractive_parse', desc, make);

  function make(){
      this.files.forEach(function(file){
          file.src.map(parse);
          var templates = arrify(),
              templateFile = file.templateFile;

          grunt.file.write(file.dest,
              "Ext.define('Savanna.components.parsedTemplates." + templateFile +"', {\n" + templates.join(",\n") + "\n});");
      });
  }

  function parse(template){
      var name = path.basename(template, '.html'),
          html = grunt.file.read(template),
          parsed = Ractive.parse(html),
          location = path.dirname(template);

      var directoryName = location.match(/\/templates\/_core\/(\w+)/)[1];//location.substring(templateIndex, nextSlash);


      grunt.log.writeln(chalk.cyan(name) + '.html parsed.');

      var startInclude = '\n';
      if (!templateJson[directoryName]) {
          templateJson[directoryName] = [];
          startInclude = ''
      }

      templateJson[directoryName].push(startInclude + '\t\t' + name + ': ' + JSON.stringify(parsed)) + ',';
  }

    function arrify() {
        var returnArray = [];

        for (var prop in templateJson) {
            if (templateJson.hasOwnProperty(prop)) {
                returnArray.push('\t' + prop + ': {\n' + templateJson[prop] + '\n\t}');
            }
        }

        return returnArray;
    }
};
