/* jshint node: true */
'use strict';

/*
This file was generated by generator-ffwd,
you probably should not modify it
*/

// var async = require('async');
var fs = require('fs');
var utils = require('ffwd-utils/server');
var _ = utils._;
var marked = require('marked');
var yfm = require('yfm');
var hljs = require('highlight.js');

// Synchronous highlighting with highlight.js
marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

/**
 * An example of feature implementation
 * @exports example-feature
 * @memberOf FFWD.server
 * @param  {Object} config ...
 * @return {Object}        ...
 */
module.exports = function(config) {
  config = config || {};
  config.pages = config.pages || 'pages';
  config.navigation = config.navigation || {};
  var ymlFileExp = /\.(yml|yaml)$/i;
  var _navCache;

  // stoopid
  config.navigation = 'pages/navigation.yml';

  config.cache = typeof config.cache !== 'undefined' ? config.cache : (config.environment !== 'dev');

  /**
   * Builds the navigation for a response.
   * @param  {connect.Request}  req  ...
   * @param  {connect.Response} res  ...
   * @param  {Function} next         ...
   */
  function navigationPopulate(req, res, next) {
    if (!_navCache || config.cache === false) {
      try {
        // assume that a string is a file path
        if (_.isString(config.navigation)) {
          // handle yaml 
          if (ymlFileExp.test(config.navigation)) {
            _navCache = yfm.read(config.navigation, {delims: ['---', '---']}).context;
          }
          // handle js, node and json
          else {
            _navCache = require(config.navigation);
          }
        }
        // handle the possiblity of using a function a function
        else {
          _navCache = _.result(config, 'navigation');
        }
      }
      catch (err) {
        return next(err);
      }
    }
    res.locals.navigation = _navCache;
    next();
  }

  /**
   * Reponse callback for /docs requests 
   * @param  {connect.Request}   req  ...
   * @param  {connect.Response}   res  ...
   * @param  {Function} next ...
   */
  function docRequest(req, res, next) {
    var name = req.url.slice(1);
    name = name || 'index';
    var filename = config.pages +'/'+ name +'.md';

    fs.exists(filename, function(yep) {
      if (!yep) {
        return next();
      }

      var content = yfm.read(filename);

      _.extend(res.locals, content.context);

      res.locals.body = marked.parse(content.content);
      
      var template = name === 'index' ? 'index' : 'default';
      template = res.locals.layout ? res.locals.layout : template;
      res.render(template);
    });
  }

  function docEditRequest(req, res, next) {
    console.info('req.query.edit', req.query.edit);
    next();
  }

  return {
    request: function(req, res, next) {
      navigationPopulate(req, res, function(err) {
        if (err) {
          return next(err);         
        }
        [req.query.edit ? docEditRequest : docRequest](req, res, function(err) {
          if (err) {
            return next(err);
          }

          next();
        });
      });
    },

    navigationPopulate: navigationPopulate,

    docRequest: docRequest,

    docEditRequest: docEditRequest
  };
};