const async = require('async')
const got = require('got')

function heads(urls, callback) {
  if (typeof urls === 'string') {
    // just one URL
    get(urls, callback)
  } else {
    // an array of URLs
    async.map(urls, get, callback)
  }
}

function get(url, callback) {
  got.head(url)
    .then(response => {
      return callback(null, response.statusCode)
    })
    .catch(error => {
      return callback(null, error.statusCode)
    })
}

module.exports = require('pify')(heads)
