module.exports = function(grunt) {

  grunt.initConfig({
    pages: {
      posts: {
        src: 'posts',
        dest: 'dist',
        layout: 'src/layouts/post.jade',
        url: 'posts/:title/',
        options: {
          pageSrc: 'src/pages',
          data: {
            baseUrl: '/'
          },
          pagination: {
            postsPerPage: 2,
            listPage: 'src/pages/index.jade'
          }
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/css',
          cssDir: 'dist/css'
        }
      }
    },
    // Move files not handled by other tasks
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'src',
            dest: 'dist',
            src: [
              'favicon.ico',
              'img/**',
              'js/**',
              'css/**.css',
              'css/fonts/**',
            ]
          }
        ]
      }
    },
    watch: {
      dist: {
        files: ['dist/**'],
        options: {
          livereload: true
        }
      },
      compass: {
        files: ['src/css/**'],
        tasks: ['compass']
      },
      pages: {
        files: [
          'posts/**',
          'src/layouts/**',
          'src/pages/**'
        ],
        tasks: ['pages']
      },
      copy: {
        files: [
          'src/img/**',
          'src/js/**',
          'src/css/**.css',
          'src/css/fonts/**'
        ],
        tasks: ['copy']
      }
    },
    connect: {
      dist: {
        options: {
          port: 5455,
          hostname: '0.0.0.0',
          middleware: function(connect) {
            return [
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
              connect.static(require('path').resolve('dist'))
            ];
          }
        }
      }
    },
    open: {
      dist: {
        path: 'http://localhost:5455'
      }
    },
    clean: {
      dist: 'dist'
    }
  });

  grunt.registerTask('build', [
    'clean',
    'pages',
    'compass',
    'copy'
  ]);

  grunt.registerTask('server', [
    'build',
    'connect',
    'open',
    'watch'
  ]);

  grunt.registerTask('default', 'server');

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
