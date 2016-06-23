const test = require('tape')
const heads = require('.')
const urls = [
  'https://google.com',
  'https://github.com',
  'https://github.com/nonexistent-url',
  'http://jus.js.org'
]

test('heads', function (t) {
  heads(urls, function(err, codes) {
    t.deepEqual(codes, [200, 200, 404, 200], 'returns an array of status codes')
    t.notOk(codes.every(code => code === 200), 'not every code is a 200')
    t.end()
  })
})
