var test = require('ava');
var trunc = require('./');
var sw = 'the force is <strong>with this one</strong>. some more rubbish';

test(t => {
  t.same(trunc(sw, 30), {
    html: 'the force is <strong>with this one</strong>. …',
    text: 'the force is with this one. …'
  });
});

test(t => {
  t.same(trunc(sw, 30, { ignoreTags: ['strong'] }), {
    html: 'the force is . some more …',
    text: 'the force is . some more …'
  });
});

test(t => {
  t.same(trunc(sw, 30, { sanitizer: { allowedTags: [] } }), {
    html: 'the force is . some more …',
    text: 'the force is . some more …'
  });
});
