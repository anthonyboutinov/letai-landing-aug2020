module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  const themePath = ''; // Автозамена для @{themePath} в production build

  const sass = require('node-sass');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'build/main.js': 'build/main.js'
        }
      },
      serve: {
        files: {
          '.tmp/serve/main.js': '.tmp/serve/main.js'
        }
      }
    },

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        src: '.tmp/building/**/*.js',
        dest: 'build/main.js'
      },
      serve: {
        src: '.tmp/building/**/*.js',
        dest: '.tmp/serve/main.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'build/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    sass: {
      options: {
        implementation: sass,
      },
      dist: {
        options: {
          // compressed for prod
          style: 'compressed',
          compass: true,
          // set up sourcemaps, requires SASS 3.3 and Compass 1.0alpha?
          sourcemap: true
        },
        files: {
          'build/main.css': '.tmp/building/main.scss'
        }
      },
      serve: {
        options: {
          // expanded for dev
          style: 'expanded',
          compass: true,
          // line numbers of scss in the css for debugging
          lineNumbers: true,
          // set up sourcemaps, requires SASS 3.3 and Compass 1.0alpha?
          sourcemap: true
        },
        files: {
          // list your css and corresponding scss pages here
          '.tmp/serve/main.css': '.tmp/building/main.scss'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      // make a subtask for each filetype to selectively run tasks and livereload
      html: {
        files: [
          'src/**/*.html'
        ],
        tasks: ['replace:serve', 'copy:serveHtml'],
      },
      js: {
        files: [
          'src/**/*.js'
        ],
        tasks: ['copy:building', 'concat:serve', 'babel:serve'],
      },
      sass: {
        options: {
          livereload: true,
        },
        files: [
          'src/**/*.scss'
        ],
        tasks: ['replace:serve', 'sass:serve'],
      },
      img: {
        files: [
          'src/images/**/*'
        ],
        tasks: ['copy:serveImg'],
      },
    },

    connect: {
      server: {
        options: {
          port: 9001,
          // open a browser
          open: true,
          // inject livereload.js into the pages
          livereload: true,
          base: ['.tmp/serve/']
        }
      }
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps
        // or
        // map: {
        //   inline: false, // save all sourcemaps as separate files...
        //   annotation: '.tmp/serve/' // ...to the specified directory
        // },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')(), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'build/*.css'
      },
      serve: {
        src: '.tmp/serve/*.css'
      }
    },

    replace: {
      build: {
        src: ['src/**/*.html', 'src/**/*.scss'],
        dest: '.tmp/building/',
        replacements: [{
          from: '@{themePath}',
          to: themePath
        }, {
          from: 'main.js',
          to: 'main.min.js'
        }]
      },
      serve: {
        src: ['src/**/*.html', 'src/**/*.scss'],
        dest: '.tmp/building/',
        replacements: [{
          from: '@{themePath}',
          to: ''
        }]
      }
    },

    clean: {
      buildjunk: ['.tmp/building', 'build/main.js', 'build/main.js.map'],
      build: ['build/'],
      serve: ['.tmp'],
    },

    copy: {
      build: {
        expand: true,
        cwd: 'src/public',
        src: '**/*',
        dest: 'build/',
      },
      serve: {
        expand: true,
        cwd: 'src/public',
        src: '**/*',
        dest: '.tmp/serve/',
      },
      buildHtml: {
        expand: true,
        cwd: '.tmp/building',
        src: '**/*.html',
        dest: 'build/',
      },
      serveHtml: {
        expand: true,
        cwd: '.tmp/building',
        src: '**/*.html',
        dest: '.tmp/serve/',
      },
      serveImg: {
        expand: true,
        cwd: 'src/images',
        src: '**/*',
        dest: '.tmp/serve/images',
      },
      nodeModules: {
        expand: true,
        cwd: 'node_modules',
        src: 'vanilla-tilt/dist/vanilla-tilt.babel.min.js',
        dest: '.tmp/building/vanilla-tilt.js',
      },
      building: {
        expand: true,
        cwd: 'src/',
        src: '**/*.js',
        dest: '.tmp/building',
      },
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{
            removeViewBox: false
          }],
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'build/'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html',
        }
      },
    },

  });

  // Default task: serve on a localhost server
  grunt.registerTask('default', [
    'clean:serve',
    'replace:serve',
    'sass:serve',
    'postcss:serve',
    'copy:building',
    'copy:nodeModules',
    'concat:serve',
    'copy:serve',
    'copy:serveImg',
    'copy:serveHtml',
    'babel:serve',
    'connect',
    'watch',
  ]);

  // Production build task
  grunt.registerTask('build', [
    'clean:build',
    'replace:build',
    'sass:dist',
    'postcss:dist',
    'copy:building',
    'copy:nodeModules',
    'concat:dist',
    'copy:build',
    'copy:buildHtml',
    'imagemin',
    'babel:dist',
    'uglify',
    'htmlmin',
    'clean:buildjunk',
  ]);

};
