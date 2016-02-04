module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //##############################################
    // Compile Sass
    //##############################################
    sass: {
      dist: {
        options: {
          style: 'expanded',
          loadPath: 'library/sass/'
        },
        files: [{
          expand: true,
          cwd: 'sass/',
          src: [ '**/*.sass' ],
          dest: '',
          ext: '.css'
        }
        ]
      }
    },

    //##############################################
    // Minify Css
    //##############################################
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '',
          src: ['**/*.css', '!*.min.css'],
          dest: '',
          ext: '.css'
        }]
      }
    },


    //##############################################
    // Watch Tasks / Sass & Jade
    //##############################################
    watch: {
      sass: {
        files: '**/*.sass',
        tasks: [ 'sass',  'cssmin' ]
      }
    },

    //##############################################
    // Start Local Server - localhost:4000
    //##############################################
    connect: {
      server: {
        options: {
          port: 4000,
          base: '',
          hostname: '*'
        }
      },
    },

});

  //##############################################
  // Load Tasks
  //##############################################
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //##############################################
  // Define Tasks
  //##############################################

  grunt.registerTask('default', 'Watches the project for changes, automatically builds them and runs a server.', [ 'sass', 'cssmin', 'connect', 'watch' ]);
};
