module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-release');
  grunt.renameTask('release', 'github-release');

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),

    'meta': {
      'jsFilesForTesting': [
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'test/**/*.js'
      ]
    },

    'karma': {
      'development': {
        'configFile': 'karma.conf.js',
        'options': {
          'files': [
            '<%= meta.jsFilesForTesting %>',
            'src/**/*.js'
          ],
        }
      },
      'dist': {
        'options': {
          'configFile': 'karma.conf.js',
          'files': [
            '<%= meta.jsFilesForTesting %>',
            'dist/<%= pkg.name %>-<%= pkg.version %>.js'
          ],
        }
      },
      'minified': {
        'options': {
          'configFile': 'karma.conf.js',
          'files': [
            '<%= meta.jsFilesForTesting %>',
            'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
          ],
        }
      }
    },

    'jshint': {
      'beforeconcat': ['src/**/*.js'],
    },

    'concat': {
      'dist': {
        'src': ['src/**/*.js'],
        'dest': 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },

    'uglify': {
      'options': {
        'mangle': false
      },  
      'dist': {
        'files': {
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>.js']
        }
      }
    },

    'prompt': {
      'target': {
        'options': {
          'questions': [
            {
              'config': 'github.auth.user', // set the user to whatever is typed for this question
              'type': 'input',
              'message': 'GitHub username:'
            },
            {
              'config': 'github.auth.password', // set the password to whatever is typed for this question
              'type': 'password',
              'message': 'GitHub password:'
            }
          ]
        }
      }
    },

    'release': {
      'options': {
        'additionalFiles': ['bower.json'],
        'github' : {
          'repo': 'turixspot/angular-input-interval',
          'usernameVar': 'github.auth.user',
          'passwordVar': 'github.auth.password'
        }
      }
    }

  });

  grunt.registerTask('test', ['karma:development']);
  grunt.registerTask('build',
    [
      'jshint',
      'karma:development',
      'concat',
      'karma:dist',
      'uglify',
      'karma:minified'
    ]);
  grunt.registerTask('release',
    [
      'build',
      'prompt',
      'github-release',
    ]);
};
