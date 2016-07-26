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
  var altBuffer = '';
  var plain = '';
  var insaneDefaults = {
    filter: filter,
    transformText: transformText
  };
  var sanitizer = o.sanitizer || {};
  var opts = assign({}, sanitizer, insaneDefaults);
  var html = insane(input, opts);
  return { html: html, text: plain + altBuffer };
  function filter (token) {
    if (token.tag in ignoreTags) {
      return false;
    }
    if (remainder <= 0) {
      return false;
    }
    if (sanitizer.filter && !sanitizer.filter(token)) {
      return false;
    }
    if (o.imageAltText && token.tag === 'img') {
      altBuffer += token.attrs.alt;
    }
    return true;
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
    plain += altBuffer + truncated;
    altBuffer = '';
    return truncated;
  }
}

module.exports = truncHtml;
