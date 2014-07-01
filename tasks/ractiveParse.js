/*
 * grunt-ractive-parse
 * https://github.com/alisonailea/grunt-ractive-parse
 *
 * Copyright (c) 2014 Alison Stump, contributors
 * Licensed under the MIT license.
 */

'use strict';
var Ractive = require('ractive'),
    chalk = require('chalk'),
    path = require('path');

module.exports = function (grunt) {
  // Task Variables
  var desc = 'pre-parse Ractive templates for use in MVC projects,',
      templateJson = {};

  // The Grunt Task    
  grunt.registerMultiTask('ractiveparse', desc, make);

  function make(){
      // set the default options
        /*jshint validthis:true */
      var files, options = this.options({
        type: 'javascript' // type: 'javascript' (default) || 'extjs'
      }),
          baseDir = this.filesSrc[0].replace(/\/\w*.\w*$/, '');

      // set a grunt option BaseDir
      grunt.option('baseDir', baseDir);

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
          options.destSyntax = setType(options, file.dest);

          // Parse the template src files
          file.src.map(parse);
          // console.log(templateJson);

          templates = arrify();
          // console.log(templates);

          templateFile = file.templateFile;

          // Join parsed files and write them to a new file.
          grunt.file.write(file.dest,
              options.destSyntax + " {\n" + templates.join(",\n") + "\n});");
              // "Ext.define('Savanna.components.parsedTemplates." + templateFile +"', {\n" + templates.join(",\n") + "\n});");

          // Log success.
          grunt.log.writeln('File "' + chalk.cyan(file.dest) + '" created.');
      });
  }

  function setType(options, path){
    switch (options.type){
      case 'javascript':
        return 'var templates =';
      
      case 'extjs':
        var dotNotationPath,
            appPath;
        if(!options.appName){
          grunt.fail.warn('You must define an "appName" in your config if you use the "extjs" type.\nThis appName should be the same as the name of your ExtJS Application\n');
        } else {
          appPath = options.appName + '.' + path;
          dotNotationPath = stringifyDest(appPath);
        }
        return "Ext.define('" + dotNotationPath +"',";
      
      default:
        // warning
        grunt.fail.warn('Unrecognized type. Please choose "javascript" or "extjs"\n');
        return false;
    }
  }
  
  function stringifyDest(path){
    // Reasses this function. There is probably a better way to do this.
    
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
      var name = path.basename(template),
          location = path.dirname(template),
          baseDir = grunt.option('baseDir'),
          matchFolder = new RegExp("\\w*$"),
          currentDir = matchFolder.exec(location)[0];

      // Check if name is a file or folder
      if(/.html/g.test(name)){
        // This is a file
        var html = grunt.file.read(template),
            parsed = Ractive.parse(html),
            stringArray = location.split('/');

        grunt.log.writeln(chalk.cyan(name) + ' parsed.');
        
        var startInclude = '\n';

        // var jsonKey = getKeys(templateJson, currentDir);
        if (!templateJson[currentDir]) {
          templateJson[currentDir] = [];
          startInclude = ''; 
        }

        templateJson[currentDir].push(startInclude + '\t\t' + name + ': ' + JSON.stringify(parsed));// + ',';

      } else {
        // This is a folder
        var files = grunt.file.expand(location+'/'+name+'/*');
        
        // parentDir = location;

        files.forEach(function(file){
          // file.src.map(parse);
          parse(file);
        });
      }
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