const async = require('async')
const got = require('got')

function heads(urls, callback) {
  async.map(urls, get, callback)
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
