module.exports = function(grunt) {

  grunt.initConfig({
    pages: {
      options: {
        rss: {
          author: 'G.C. Marty',
          title: 'Just a blog by G.C. Marty',
          description: 'Just a blog about JavaScript, HTML, the web platform, NLP and to how optimise them all!',
          url: 'http://gu.illau.me',
          numPosts: 20
        }
      },
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
          cssDir: 'dist/css',
          outputStyle: 'compressed'
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
              // Resources located at root level.
              'CNAME',
              'favicon.ico',
              'googlea15f277b4e0d89d7.html',
              'manifest.json',
              'manifest.webapp',
              // Other resources.
              'img/**',
              'js/**',
              'css/**.css',
              'css/fonts/**'
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
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
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

  grunt.registerTask('deploy', [
    'build',
    'gh-pages'
  ]);

  grunt.registerTask('default', 'server');

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
