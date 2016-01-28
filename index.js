'use strict';

var insane = require('insane');
var assign = require('assignment');
var truncText = require('trunc-text');
var delimiter = '…';

function intoHashMap (map, tag) {
  map[tag] = true;
  return map;
}

function truncHtml (input, limit, options) {
  var o = options || {};
  var remainder = Number(limit);
  var ignoreTags = (o.ignoreTags || []).reduce(intoHashMap, Object.create(null));
  var plain = '';
  var insaneDefaults = {
    filter: filter,
    transformText: transformText
  };
  var html = insane(input, assign(o.sanitizer || {}, insaneDefaults));
  return { html: html, text: plain };
  function filter (token) {
    if (token.tag in ignoreTags) {
      return false;
    }
    return remainder > 0;
  }
  function transformText (text) {
    if (remainder <= 0) {
      return '';
    }
    var truncated = truncText(text, remainder);
    if (truncated[truncated.length - 1] === delimiter) {
      remainder = 0;
    } else {
      remainder -= truncated.length;
    }
    plain += truncated;
    return truncated;
  }
}

module.exports = truncHtml;
