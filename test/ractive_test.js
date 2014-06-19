(function () {
  'use strict';
  var grunt = require('grunt');

  exports.confirmMatch = function(test){
    var ext = 'extTemplates.js';
    var js = 'templates.js';

    var compareFolder = __dirname+'/compare';
    var tmpFolder = __dirname+'/tmp';

    var compare = {};
        compare.ext = grunt.file.read(compareFolder+'/'+ext);
        compare.js = grunt.file.read(compareFolder+'/'+js);

    var tmp = {};
        tmp.ext = grunt.file.read(tmpFolder+'/'+ext);
        tmp.js = grunt.file.read(tmpFolder+'/'+js);

    test.expect(2);
    test.strictEqual(tmp.ext, compare.ext, 'The Ext template does not match the compare test.') ;
    test.strictEqual(tmp.js, compare.js, 'The javascript template does not match the compare test.') ;
    test.done();
  };
}());

