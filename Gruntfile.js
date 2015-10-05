'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'public',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      less:{
        files: ['less/{,*/}*.less'],
        tasks: ['less:dev'],
        options:{livereload:true},
      },
      js:{
        files: ['scripts/{,*/}*.js'],
        tasks: ['copy:devjs'],
        options:{livereload:true},
      },
      coffee:{
        files: ['scripts/{,*/}*.coffee'],
        tasks: ['coffee:dev'],
        options:{livereload:true},        
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to 'localhost' to forbid access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('public'),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          keepalive: true,
          middleware: function (connect) {
            return [
              connect.static('dist'),
              connect.static(config.dist)
            ];
          }
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
      ]
    },

    less: {
      dev:{
        files: {
          "<%= config.app %>/kiwidark.css": "less/kiwidark.less",
          "<%= config.app %>/kiwibright.css": "less/kiwibright.less"
        }
      },
      dist:{
        files: {
          "<%= config.dist %>/kiwidark.css": "less/kiwidark.less",
          "<%= config.dist %>/kiwibright.css": "less/kiwibright.less",
          "<%= config.dist %>/hubspot.css": "less/hubspot.less",
        }
      },
    },
    coffee:{
      dev:{
        expand: true,
        flatten: true,
        cwd: 'scripts/',
        src: ['{,*/}*.coffee'],
        dest: '<%= config.app %>/scripts/',
        ext: '.js'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: ['*.css', '!*.min.css'],
          dest: '<%= config.dist %>',
          ext: '.min.css'
        }]
      }
    },
    htmlmin:{
      target:{
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
        },
        files:{
          '<%= config.dist%>/index.html': '<%= config.dist%>/index.html'
        },
      },
    },
    useminPrepare: {
      html: '<%= config.dist %>/index.html',
      options: {
        flow: {
          html: {
            steps: {
              js: ['concat','uglify']
            },
            post: {}
          }
        }
      }
    },
    usemin:{
      html: '<%= config.dist %>/index.html',
    },
    copy: {
      dev:{
        files:[{
          expand: true,
          dot: true,
          cwd: 'font',
          dest: '<%= config.app %>/font/',
          flatten: false,
          src: ['*'],
        },{
          expand: true,
          dot: true,
          cwd: 'scripts',
          dest: '<%= config.app %>/',
          flatten: false,
          src: ['{,*/}*.js'],
        }],
      },
      devjs:{
        files:[{
          expand: true,
          dot: true,
          cwd: 'scripts',
          dest: '<%= config.app %>/scripts/',
          flatten: false,
          src: ['{,*/}*.js'],
        }],
      },
      dist:{
        files:[{
          expand: true,
          dot: true,
          cwd: 'font',
          dest: '<%= config.dist %>/font/',
          flatten: false,
          src: ['*'],
        },{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          flatten: false,
          src: ['index.html'],
        }],
      }
    },
    // Empties folders to start fresh
    clean: {
      dev:{
        files:[{
          dot: true,
          src:[
            '<%= config.app %>/styles/*.css',
            '<%= config.app %>/styles/font/*',
            '<%= config.app %>/scripts/{,*/}*.js',
          ]
        }],
      },
      predist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*',
            '.tmp'
          ]
        }]
      },
      postdist:{
        files: [{
          dot: true,
          src: [
            '.tmp'
          ]
        }]
      }
    },

  });

  grunt.registerTask('serve', function(arg){
    if(arg !== 'dist'){
      grunt.task.run([
        'clean:dev',
        'less:dev',
        'coffee:dev',
        'copy:dev',
        'connect:livereload',
        'watch'
      ]);
    }else{
      grunt.task.run([
        'build',
        'connect:dist'
      ]);
    }
  });
  grunt.registerTask('build', function (arg) {
    if (arg === 'guide') {
      grunt.task.run([
        'clean:dev',
        'less:dev',
        'coffee:dev',
        'copy:dev',
      ]);
    }else{
      grunt.task.run([
        'clean:predist',
        'copy:dist',
        'less:dist',
        'cssmin',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'usemin',
        'htmlmin',
      ]);
      if(arg !== "noclean"){
        grunt.task.run([
          'clean:postdist',
        ]);
      }
    }
  });

  grunt.registerTask('default', [
    'serve'
  ]);
};
