module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //##############################################
    // Copy Assets
    //##############################################

      copy: {
      build: {
        files: [{
          expand: true,
          cwd: '',
          src: [ '**/*', '!**/sass/**', '!**/node_modules/**', '!js/script.js', '!Gruntfile.js', '!package.json' ],
          dest: 'build'
        },
        ],
      },
    },


    //##############################################
    // Copy Assets
    //##############################################
    clean: {
      build: {
        src: 'build'
      }
    },

    //##############################################
    // Compile Sass
    //##############################################
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'sass/',
          src: [ '**/*.sass' ],
          dest: 'build/',
          ext: '.css'
        }
        ]
      }
    },

    //##############################################
    // Browserify JS
    //##############################################

    browserify: {
      dist: {
        files: {
          'build/js/bundle.js': 'js/**/*.js'
        }
      }
    },

    //##############################################
    // Watch Tasks / Sass
    //##############################################
    watch: {
      sass: {
        files: '**/*.sass',
        tasks: [ 'sass' ]
      },
      js: {
        files: 'js/**/*.js',
        tasks: 'browserify'
      }
    },

    //##############################################
    // Start Local Server - localhost:4000
    //##############################################
    connect: {
      server: {
        options: {
          port: 4000,
          base: 'build/',
          hostname: '*'
        }
      },
    },

});

  //##############################################
  // Load Tasks
  //##############################################
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  //##############################################
  // Define Tasks
  //##############################################

  grunt.registerTask('default', 'Watches the project for changes, automatically builds them and runs a server.', ['clean', 'copy:build', 'sass', 'browserify', 'connect', 'watch' ]);
};
