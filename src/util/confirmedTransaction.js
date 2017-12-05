const whilst = require('async/whilst')

module.exports = exports = function (web3, txId, cb) {
  let confirmed = false
  let limit = 5
  let blockNumber = web3.eth.blockNumber

  return whilst(
    function () {
      return confirmed === false
    },
    function (callback) {
      web3.eth.getTransaction(txId, function (err, tx) {
        if (err) {
          window.setTimeout(function () {
            callback(err, null)
          }, 1000)
        }
        if (tx && tx.blockNumber !== null) {
          if (blockNumber >= (tx.blockNumber + limit)) {
            confirmed = true
            window.setTimeout(function () {
              callback(null, tx)
            }, 1000)
            return
          }
        }
        window.setTimeout(function () {
          callback(null, null)
        }, 1000)
      })
    },
    function (err, tx) {
      if (err) {
        return cb(err, null)
      }
      if (tx && confirmed) {
        return cb(null, tx)
      }
    }
  )
}
