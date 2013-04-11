module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('./package.json');

  grunt.initConfig({
    prefix: [pkg.family, pkg.name, pkg.version].join('/'),

    build: {
      puerh: {
        file: './lib/puerh.js',
        header: 'define("<%= prefix %>/puerh", function(require, exports, module){',
        footer: '});'
      },
      expect: {
        file: './lib/vendor/expect.js',
        header: 'define("<%= prefix %>/vendor/expect", [], function(require, exports, module){',
        footer: '});'
      }
    },

    concat: {
      dist: {
        src: ['.build/vendor/expect.js', '.build/puerh.js'],
        dest: 'dist/puerh-debug.js'
      }
    },

    uglify: {
      dist:{
        files: {
          'dist/puerh.js': ['dist/puerh-debug.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerMultiTask('build', function(){
    var data = this.data;

    var file = grunt.file.read(data.file, {encoding: 'utf-8'});
    var content = [data.header, file, data.footer].join('\n');
    var tmp = data.file.replace(/\/lib\//, '/.build/');
    grunt.file.write(tmp, content, {encoding: 'utf-8'});
  });

  grunt.registerTask('default', ['build', 'concat', 'uglify']);
};
