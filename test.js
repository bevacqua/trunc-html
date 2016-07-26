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


test(t => {
  t.same(trunc('some sort of tada <img class="tj-emoji" alt="&#x1F389;" src="https://twemoji.maxcdn.com/2/72x72/1f389.png"/>', 30, { imageAltText: true }), {
    html: 'some sort of tada <img alt="&#x1F389;" src="https://twemoji.maxcdn.com/2/72x72/1f389.png"/>',
    text: 'some sort of tada 🎉'
  });
  t.same(trunc('some <img class="tj-emoji" alt="&#x1F389;" src="https://twemoji.maxcdn.com/2/72x72/1f389.png"/> sort of tada <img class="tj-emoji" alt="&#x1F389;" src="https://twemoji.maxcdn.com/2/72x72/1f389.png"/>', 30, { imageAltText: true }), {
    html: 'some <img alt="&#x1F389;" src="https://twemoji.maxcdn.com/2/72x72/1f389.png"/> sort of tada <img alt="&#x1F389;" src="https://twemoji.maxcdn.com/2/72x72/1f389.png"/>',
    text: 'some 🎉 sort of tada 🎉'
  });
    t.same(trunc('some sort of tada <img class="tj-emoji" alt="&#x1F389;" src="https://twemoji.maxcdn.com/2/72x72/1f389.png"/> then <img a="a" alt="bar" src="https://ponyfoo.com/foo.png" /> scoop', 30, { imageAltText: true, sanitizer: { filter: token => token.tag !== 'img' || token.attrs.class === 'tj-emoji' } }), {
      html: 'some sort of tada <img alt="&#x1F389;" src="https://twemoji.maxcdn.com/2/72x72/1f389.png"/> then  scoop',
      text: 'some sort of tada 🎉 then  scoop'
    });
});
