/*
 * grunt-ractive-parse
 * https://github.com/alisonailea/grunt-ractive-parse
 *
 * Copyright (c) 2014 Alison Stump, Edward Irby, contributors
 * Licensed under the MIT license.
 */

(function () {
  'use strict';
  var Ractive = require('ractive'),
      chalk = require('chalk'),
      fs = require('fs'),
      path = require('path');

  module.exports = function (grunt) {

    // Task Variables
    var desc = 'pre-parse Ractive templates for use in MVC projects,',
        templateJson = {},
        baseDir,
        options;

    // The Grunt Task
    grunt.registerMultiTask('ractiveparse', desc, make);

    function make(){
        // set the default options
         /*jshint validthis:true */
        var files;

        options = this.options({
          type: 'javascript' // type: 'javascript' (default) || 'extjs'
        });

        // Identify the base directory using the path of the first element
        baseDir = this.filesSrc[0].replace(/[^\/]*$/, '');

        // Check for src files
        if(this.files[0] === undefined){
          grunt.fail.warn('Can not find src files. Please check your Gruntfile configuration \n');
        } else {
          files = this.files;
        }

        // Loop through the src files then join them in a single Destination file.
        files.forEach(function(file){
            var templates,
                templateFile;

            // Define destination type
            options.destSyntax = setType(file.dest);

            // Parse the template src files
            file.src.map(parse);

            templates = arrify(templateJson);

            templateFile = file.templateFile;

            // Join parsed files and write them to a new file.
            grunt.file.write(file.dest,
                options.destSyntax + " {\n" + templates.join(",\n") + "\n\n});");

            // Log success.
            grunt.log.writeln('File "' + chalk.cyan(file.dest) + '" created.');
        });

        templateJson = {};
    }

    function setType(filePath){

      filePath = path.normalize(filePath);

      switch (options.type){
        case 'javascript':
          return 'var templates =';

        case 'extjs':
          var dotNotationPath,
              appPath;
          if(!options.appName){
            grunt.fail.warn('You must define an "appName" in your config if you use the "extjs" type.\nThis appName should be the same as the name of your ExtJS Application\n');
          } else {
            var newPath = stringifyDest(filePath);
            appPath = options.appName + '.' + newPath;
          }
          return "Ext.define('" + appPath +"',";

        default:
          // warning
          grunt.fail.warn('Unrecognized type. Please choose "javascript" or "extjs"\n');
          return false;
      }
    }

    function stringifyDest(filePath){

      // remove the file extension
      var dotPath = filePath.replace(/\.\w*$/, '');
      // create Array to hold sections of the path.
      var pathArray = [];

      // break filePath up by '/' OR '\' and remove the last word (the file name),
      // capitalize the last word then puth the filePath back together with '.'
      if(dotPath.indexOf('\/') !== -1){
        // UNIX PATH
        pathArray = dotPath.split('\/');
      } else if(dotPath.indexOf('\\')){
        // WINDOWS PATH
        pathArray = dotPath.split('\\');
      } else {
        // File only
        return dotPath;
      }

      var file = pathArray.pop();

      if(options.ignorePath){
        var removePathArray = options.ignorePath;
        var newPathArray = pathArray;
            removePathArray = removePathArray.split('/');

        for(var i = pathArray.length; i>-1; i--){
          var path = newPathArray[i];

          for(var j = 0; j<removePathArray.length; j++){
            var drop = removePathArray[j];

            if (drop === path){
              var remove = newPathArray.splice(i, 1);
            }
          }
        }
        pathArray = newPathArray;
      }

      var fileToUppercase = file.charAt(0).toUpperCase() + file.slice(1);
          pathArray.push(fileToUppercase);
          dotPath = pathArray.join('.');

      return dotPath;
    }

    function parse(template){

      if (!templateJson.templates) {
        templateJson.templates = [];
      }

      templateJson.templates.push(dirTree(template));
    }

    function dirTree(filename) {
        var stats = fs.lstatSync(filename),
            matchExtension = new RegExp(/\.\w*/),
            name = path.basename(filename).replace(matchExtension, ''),
            info = {
                path: filename
            };

        if (stats.isDirectory()) {
            info[name] = '\t'+fs.readdirSync(filename).map(function(child) {
                return dirTree(filename + '/' + child);
            });
        } else {
            // Assuming it's a file.
            var html = grunt.file.read(filename),
                tabs = function(){
                  var string = '\t\t\t',
                      path = info.path.replace(baseDir, '').split('/');

                  if(path.length > 1){
                    for(var i=0;i<path.length;i++){
                      string = string + '\t';
                    }
                  }

                  return string;
                };

            return '\n'+ tabs() + name + ' : ' + JSON.stringify(Ractive.parse(html));
        }

        return arrify(info);
    }

    function arrify(templateObject) {
        var returnArray = [],
            tabs = '\t\t';

        if(templateObject.path){
          var string = tabs,
              path = templateObject.path.replace(baseDir, '').split('/');

          for(var i=0;i<path.length;i++){
            string = string + '\t';
          }

          tabs = string;
        }

        for (var prop in templateObject) {
            if (templateObject.hasOwnProperty(prop)) {
                if(prop !== 'path'){
                  returnArray.push('\n'+tabs + prop + ': {' + tabs + templateObject[prop] + '\n'+ tabs + '}');
                }
            }
        }

        return returnArray;
    }
  };
}());
