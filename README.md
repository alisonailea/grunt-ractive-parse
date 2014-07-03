# grunt-ractive-parse

> Pre-parse Ractive templates for use in ExtJS or other MVC projects

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ractive-parse --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ractive-parse');
```

## The "ractive_parse" task

### Overview
In your project's Gruntfile, add a section named `ractive_parse` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  ractiveparse: {
    options: {
      // Task-specific options go here.
    },
    // Your src directory goes here. 
    // If you have more than one direcotry or want to specify specific files use this syntax ['/one', 'two.html']
    src: '', 

    // Your destination file goes here. Note: you may have only one destination file for each ractive_parse
    dest: ''
  },
});
```

### Options

#### options.appName
Type: 'String'
Default value: NA 

A string value that is used set the name of the app. Note: this field is required if you use the 'extjs' type

#### options.type
Type: `String`
Default value: 'javascript' 

A string value that is used to identify the syntax of the parsed templates file.
Options are 'javascript' || 'extjs'

#### options.ignore
Type: `String`
Default value: '' 

A string value path that is used to identify folder names to skip when creating the ExtJS class name.

### Usage Examples

#### Default Options
In this example, the default options are used to parse the templates directory. This will loop through all folders in the templates directory and create a single templates javascript file of pre-parsed Ractive templates.

```js
grunt.initConfig({
  ractiveparse: {
    options: {},
    src: 'templates/*',
    dest: 'code/templates.js'
  },
});
```

#### Custom Options 
In this example, custom options are used to do set the final javascript template file as an Sencha ExtJS class. 
The appName must match the name of your ExtJS applicaiton. The class path will automatically be set using the appName + the path to your final destination template.

*Example*

Gruntfile.js
```js
grunt.initConfig({
  ractiveparse: {
    options: {
      appName: 'MyApp',
      type: 'extjs',
      ignore: 'app/'
    },
    src: 'templates/*',
    dest: 'app/templates/templates.js'
  },
});
```

File Structure
```
MyApp/
  |- index.html

  |- app/
    |- templates/

  |- templates/
    |- temp1.html
    |- temp2.html
    |- one/
      |- onetemp1.html
      |- onetemp2.html
```

MyApp/app/templates/templates.js
```js
Ext.define('MyApp.templates.Templates', {
  templates: {
    temp1 : [{"t":7,"e":"div","a":{"class":"box"},"f":[{"t":2,"x":{"r":["box","content"],"s":"${0}-${1}"}}]}],
    temp2 : [{"t":7,"e":"button","a":{"class":"btn"},"f":[{"t":2,"x":{"r":["button","label"],"s":"${0}-${1}"}}]}],
    one: {        
        onetemp1 : [{"t":7,"e":"div","a":{"class":"box"},"f":[{"t":2,"x":{"r":["box","content"],"s":"${0}-${1}"}}]}],
        onetemp2 : [{"t":7,"e":"button","a":{"class":"btn"},"f":[{"t":2,"x":{"r":["button","label"],"s":"${0}-${1}"}}]}]
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Use the [.editorconfig](http://editorconfig.org/) file associated with this project and add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/) and [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint).
Please see the [Contributing to grunt](http://gruntjs.com/contributing) guide for information on contributing to this project.

## Release History

