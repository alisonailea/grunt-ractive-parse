/*
 * grunt-ractive-parse
 * https://github.com/alisonailea/grunt-ractive-parse
 *
 * Copyright (c) 2014 Alison Stump
 * Licensed under the MIT license.
 */

'use strict';
var Ractive = require('ractive'),
    path = require('path');

module.exports = function (grunt) {
  var desc = 'pre-parse Ractive templates for use in MVC projects';
  var target = grunt.option('target') || 'extjs';


  grunt.registerMultiTask('ractive_parse', desc, make);

  function make(){
      this.files.forEach(function(file){
          var templates = file.src.map(parse);
          var target = grunt.option('target');
          var path;

          switch(target){
            case 'extjs' :
              path = 'Ext.define("Savanna.components.templates", {';
            break;
            case 'normal' :
              path = 'var templates = {';
            break;
            defualt:
              grunt.log.error(["options are extjs || normal ... leave blank to use extjs"]);
            break;
          }
          grunt.file.write(file.dest,
              path+'\n' + templates.join(',\n') + '\n}');
      });
  }

  function parse(template){
      var name = path.basename(template, '.html'),
          html = grunt.file.read(template),
          parsed = Ractive.parse(html);

      return  '\t' + name + ': ' + JSON.stringify(parsed);
  }
};
