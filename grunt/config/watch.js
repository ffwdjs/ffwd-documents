/* jshint node: true */
'use strict';

var utils = require('ffwd-utils/server');


/*
This file was generated by generator-ffwd,
you probably should not modify it
*/

module.exports = function(config) {
  var jsFiles = [
        'grunt/**/*.js',
        'server/**/*.js',
        'client/scripts/**/*.js'
      ].concat(utils.featuresFiles());

  return {
    options: {
      livereload: false
    },
    
    scripts: {
      files: [
        'client/scripts/**/*.js'
      ],
      tasks: [
        'newer:jshint:client',
        'scripts:dev',
        // requirejs needs a tmp dir for build
        'styles:dev'
      ]
    },

    styles: {
      files: [
        'client/{styles,less}/**/*.{less,css}',
        'client/{style,sass,scss}/**/*.{scss,sass,css}'
      ],
      tasks: [
        'styles:dev'
      ]
    },

    // doc: {
    //   options: {
    //     livereload: config.livereloadPort || true
    //   },
    //   files: jsFiles,
    //   tasks: [
    //     'ffwd-doc'
    //   ]
    // },

    // server: {
    //   files: [
    //     '*.js',
    //     'server/**/*.js'
    //   ],
    //   tasks: [
    //     'express-restart:dev'
    //   ]
    // },

    served: {
      options: {
        livereload: config.livereloadPort || true
      },
      files: [
        'dist'
      ],
      tasks: []
    }
  };
}