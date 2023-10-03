const config = {}

config.hosts = {
  main: {
    test: false,
    rpcUri: 'https://mainnet.infura.io/v3/e117f524e71d42ec85df7fbdfe2e46e3',
    explorerUri: 'https://etherscan.io',
    chainId: 1,
    confirmation: 15
  },
  goerli: {
    test: true,
    rpcUri: 'https://goerli.infura.io/v3/e117f524e71d42ec85df7fbdfe2e46e3',
    explorerUri: 'https://goerli.etherscan.io',
    chainId: 5,
    confirmation: 2
  },
  sepolia: {
    test: true,
    rpcUri: 'https://sepolia.infura.io/v3/e117f524e71d42ec85df7fbdfe2e46e3',
    explorerUri: 'https://sepolia.etherscan.io',
    chainId: 11155111,
    confirmation: 2
  },
  polygon: {
    test: true,
    rpcUri: 'https://polygon-rpc.com',
    explorerUri: 'https://polygonscan.com',
    chainId: 137,
    confirmation: 64
  },
  mumbai: {
    test: true,
    rpcUri: 'https://polygon-mumbai.infura.io/v3/e117f524e71d42ec85df7fbdfe2e46e3',
    explorerUri: 'https://mumbai.polygonscan.com',
    chainId: 80001,
    confirmation: 2
  }
}

module.exports = exports = config
