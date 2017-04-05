const async = require('async')
const got = require('got')

function heads(urls, options, callback) {
  options = options || {};

  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }

  if (typeof urls === 'string') {
    // just one URL
    get(options, urls, callback)
  } else {
    // an array of URLs
    async.map(urls, get.bind(null, options), callback)
  }
}

function get(options, url, callback) {
  got.head(url, options)
    .then(response => {
      return callback(null, response.statusCode)
    })
    .catch(error => {
      return callback(null, error.statusCode)
    })
}

module.exports = require('pify')(heads)
