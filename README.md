# NPM module grunt-ractive-parse

> pre-parse Ractive templates for use in javascfript projects with AMD

## Acknowledgements
Based on the code from Ractive.org http://docs.ractivejs.org/latest/get-started-with-node-js

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
  ractive_parse: {
    your_target: {
      src :  // path to your target source folders/files here.
      dest: // path to your target destination file here.
    },
  },
});
```

### Usage Examples

```js
grunt.initConfig({
  ractive_parse: {
    ractive: {
      src: 'templates/*.html',
      dest: 'components/parsedTemplates/templates.js'
    }
  },
});
```

## Contributing
Interested in contributing? Submit issues to https://github.com/alisonailea/grunt-ractive-parse/issues or Fork and submit a pull request.

## Release History
v.0.1.0 - initial setup, working version

v.0.1.1 - code cleanup
