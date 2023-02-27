const config = {}

config.hosts = {
  main: {
    test: false,
    rpcUri: 'https://mainnet.infura.io/v3/e117f524e71d42ec85df7fbdfe2e46e3',
    explorerUri: 'https://etherscan.io',
    chainId: 1
  },
  goerli: {
    test: true,
    rpcUri: 'https://goerli.infura.io/v3/e117f524e71d42ec85df7fbdfe2e46e3',
    explorerUri: 'https://goerli.etherscan.io',
    chainId: 5
  },
  sepolia: {
    test: true,
    rpcUri: 'https://sepolia.infura.io/v3/e117f524e71d42ec85df7fbdfe2e46e3',
    explorerUri: 'https://sepolia.etherscan.io',
    chainId: 11155111
  }
}

module.exports = exports = config
