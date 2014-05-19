/*
 * grunt-ractive-parse
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Alison Stump, contributors
 * Licensed under the MIT license.
 */
(function () {
  'use strict';
  var Ractive = require('ractive');
  var chalk = require('chalk');
  var path = require('path');

  module.exports = function (grunt) {
    
    grunt.registerMultiTask('ractiveParse', 'Pre-Parse Ractive templates for use in AMD projects', function(){
      // set the default options
      var options = this.options({
        type: 'javascript' // type: 'javascript' (default) || 'extjs'
      });

      this.files.forEach(function(file){
        // Define destination type
        options.destSyntax = setType(options, file.dest);
        
        // Create array of parsed Files
        var templates = file.src.map(parse);

        // // Join parsed files and write them to a new file.
        grunt.file.write(file.dest,
          options.destSyntax + " {\n" + templates.join(",\n") + "\n});");

        // // Log success.
        grunt.log.writeln('File "' + chalk.cyan(file.dest) + '" created.');

      });
    });

    function setType(options, path){
      switch (options.type){
        case 'javascript':
          return 'var templates =';
        case 'extjs':
          if(!options.appName){
            grunt.fail.warn('You must define an "appName" in your config if you use the "extjs" type.');
          }
          var appPath = options.appName + '.' + path;
          var dotNotationPath = stringifyDest(appPath);
          return "Ext.define('" + dotNotationPath +"',";
        default:
          // warning
          grunt.fail.warn('Unrecognized type. Please choose "javascript" or "extjs"');
          return false;
      }
    }
    
    function stringifyDest(path){
      // remove the file extension
      var dotPath = path.replace(/\.\w*$/, '');

      // break path up by '/' and remove the last word (the file name), 
      // capitalize the last word then puth the path back together with '.'
      var pathArray = dotPath.split('/');
      var file = pathArray.pop();
      var fileToUppercase = file.charAt(0).toUpperCase() + file.slice(1);
          pathArray.push(fileToUppercase);
          dotPath = pathArray.join('.');
      
      return dotPath;
    }

    function parse(template){
        var name = path.basename(template, '.html'),
            html = grunt.file.read(template),
            parsed = Ractive.parse(html);

        grunt.log.writeln(chalk.cyan(name) + '.html parsed.');
        return  '\t' + name + ': ' + JSON.stringify(parsed);
    }

  };
}());