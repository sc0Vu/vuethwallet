const config = {}

config.hosts = {
  main: {
    test: false,
    rpcUri: 'https://mainnet.infura.io/vuethwallet'
  },
  ropsten: {
    test: true,
    rpcUri: 'https://ropsten.infura.io/vuethwallet'
  },
  kovan: {
    test: true,
    rpcUri: 'https://kovan.infura.io/vuethwallet'
  },
  rinkeby: {
    test: true,
    rpcUri: 'https://rinkeby.infura.io/vuethwallet'
  },
  infura: {
    test: true,
    rpcUri: 'https://infuranet.infura.io/vuethwallet'
  }
}

module.exports = exports = config
