module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('./package.json');

  grunt.initConfig({
    prefix: [pkg.family, pkg.name, pkg.version].join('/'),

    build: {
      puerh: {
        file: './lib/puerh.js',
        filename: 'puerh.js',
        header: 'define("<%= prefix %>/puerh", ["sinon"], function(require, exports, module){',
        footer: '});'
      },
      "puerh-debug": {
        file: './lib/puerh.js',
        filename: 'puerh-debug.js',
        header: 'define("<%= prefix %>/puerh-debug", ["sinon"], function(require, exports, module){',
        body: function(content) {
          return content.replace(/(\.\/vendor\/expect)/g, '$1-debug');
        },
        footer: '});'
      },
      expect: {
        file: './lib/vendor/expect.js',
        filename: 'expect.js',
        header: 'define("<%= prefix %>/vendor/expect", [], function(require, exports, module){',
        footer: '});'
      },
      "expect-debug": {
        file: './lib/vendor/expect.js',
        filename: 'expect-debug.js',
        header: 'define("<%= prefix %>/vendor/expect-debug", [], function(require, exports, module){',
        footer: '});'
      }
    },

    concat: {
      dist: {
        src: ['.build/vendor/expect.js', '.build/puerh.js'],
        dest: 'dist/puerh.js'
      },
      "dist-debug": {
        src: ['.build/vendor/expect-debug.js', '.build/puerh-debug.js'],
        dest: 'dist/puerh-debug.js'
      },
    },

    uglify: {
      dist:{
        files: {
          'dist/puerh.js': ['dist/puerh.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerMultiTask('build', function(){
    var data = this.data;

    var file = grunt.file.read(data.file, {encoding: 'utf-8'});
    if(data.body) {
      file = data.body(file);
    }
    var content = [data.header, file, data.footer].join('\n');
    var tmp = data.file.replace(/\/lib\//, '/.build/').replace(/\/([^\/]*\.js)$/, '/' + data.filename);
    grunt.file.write(tmp, content, {encoding: 'utf-8'});
  });

  grunt.registerTask('default', ['build', 'concat', 'uglify']);
};
