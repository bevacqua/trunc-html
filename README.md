# trunc-html

[![Build Status](https://travis-ci.org/bevacqua/trunc-html.svg?branch=master)](https://travis-ci.org/bevacqua/trunc-html)

> truncate html by text length

# install

using `npm`.

```shell
npm install -S trunc-html
```

# features

- fast, lean, extensible
- truncate by text length, not html length
- truncate by complete words, not just by characters

# `trunc(html, limit, options?)`

Returns the result of truncating the provided `html`. A plain-text version is provided as well.

```js
var html = 'the force is <strong>with this one</strong>. some more rubbish';
trunc(html, 30);
// <-
//    { html: 'the force is <strong>with this one</strong>. …',
//      text: 'the force is with this one. …' }
```

## `limit`

Maximum amount of text characters allowed. When the `limit` is reached, the algorithm will trace back to the last word separator and trim the rest into a `…` glyph.

## `options.ignoreTags`

If you'd like to supress certain HTML tags from being output you can provide an array of tags to be excluded, e.g `['img']`.

## `options.sanitizer`

Options passed to [`insane`][1]. Note that these options are overridden by the options provided by `trunc-html`, so you can't use `filter` and `transformText`, which `trunc-html` reserves for itself.

# related

- [`trunc-text`](https://github.com/bevacqua/trunc-text)

# license

MIT

[1]: http://github.com/bevacqua/insane
