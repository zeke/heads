const heads = require('./')
const urls = [
  'https://google.com',
  'https://github.com',
  'https://github.com/nonexistent-url'
]

heads(urls, function(err, codes) {
  console.log(codes)
  // [200, 200, 404]
})
