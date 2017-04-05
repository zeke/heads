const test = require('tape')
const heads = require('.')
const sinon = require('sinon')
const got = require('got')
const urls = [
  'https://google.com',
  'https://github.com',
  'https://github.com/nonexistent-url',
  'http://jus.js.org'
]

test('heads', function (t) {
  t.plan(5)

  heads(urls, function(err, codes) {
    t.deepEqual(codes, [200, 200, 404, 200], 'returns an array of status codes')
    t.notOk(codes.every(code => code === 200), 'not every code is a 200')
  })

  heads(urls).then(function(codes) {
    t.deepEqual(codes, [200, 200, 404, 200], 'supports promises')
  })

  heads(urls[0]).then(function(codes) {
    t.deepEqual(codes, 200, 'allows a single URL to be passed')
  })

  const headSpy = sinon.spy(got, 'head');
  const options = { retries: 2 };
  heads(urls[0], options).then(function(codes) {
    t.deepEqual(headSpy.calledWithExactly(urls[0], options), true, 'allows got options to be passed')
  })
})
