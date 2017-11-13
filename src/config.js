const config = {}

config.hosts = {
  main: {
    test: false,
    rpcUri: 'https://mainnet.infura.io/vuethwallet',
    chainId: 1
  },
  ropsten: {
    test: true,
    rpcUri: 'https://ropsten.infura.io/vuethwallet',
    chainId: 3
  },
  kovan: {
    test: true,
    rpcUri: 'https://kovan.infura.io/vuethwallet',
    chainId: 42
  },
  rinkeby: {
    test: true,
    rpcUri: 'https://rinkeby.infura.io/vuethwallet',
    chainId: 4
  },
  infura: {
    test: true,
    rpcUri: 'https://infuranet.infura.io/vuethwallet',
    chainId: 999
  }
}

module.exports = exports = config
