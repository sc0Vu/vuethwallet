const whilst = require('async/whilst')

module.exports = function (provider, txId, limit, cb) {
  let confirmed = false

  return whilst(
    function () {
      return confirmed === false
    },
    function (callback) {
      provider.getTransaction(txId)
        .then(function (tx) {
          const blockNumber = provider.blockNumber
          if ((blockNumber && blockNumber > 0) && (tx && tx.blockNumber !== null)) {
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
        .catch(function (err) {
          window.setTimeout(function () {
            callback(err, null)
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
