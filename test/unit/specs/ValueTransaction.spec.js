import Vue from 'vue'
import EtherTransaction from '@/views/eth/EtherTransaction'
import zxcvbn from 'zxcvbn'
import config from '@/config'

describe('EtherTransaction.vue', function () {
  const weakPassword = zxcvbn('aaaaaaaa')
  const strongPassword = zxcvbn('qwfgzxjk123')
  const validKeystoreJson = `{"version":3,"id":"884a5d82-b733-4439-bd77-da963d843533","address":"149a7dff81ecee54652e57e97b0ce2f80763e9fe","crypto":{"ciphertext":"a7b99127257b2d7e9c240190f9476a973a424976342652be7746f6fb51bcdf63","cipherparams":{"iv":"755a411527608ed95d6c0e273a70b303"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"38fd8be9dc52df2a906129abbc6269408e1c2133996b34e2371099ef6c544a99","n":262144,"r":8,"p":1},"mac":"f6f6ee7d755c841b9b9382563e112a47e172e53da8c36533adacaf80db5c6cac"}}`
  const inValidKeystoreJson = '{version:1}}'
  const Constructor = Vue.extend(EtherTransaction)
  const host = config.hosts.rinkeby

  it('should have ether-transaction name', () => {
    expect(EtherTransaction.name)
      .to.equal('ether-transaction')
  })

  it('should have message components', () => {
    expect(typeof EtherTransaction.components.Message)
      .to.equal('object')
  })

  it('should have password input components', () => {
    expect(typeof EtherTransaction.components.PasswordInput)
      .to.equal('object')
  })

  it('should have default data', () => {
    const data = EtherTransaction.data()

    expect(data.password).to.equal('')
    expect(data.type).to.equal('text')
    expect(data.buttonText).to.equal('Hide')
    expect(data.score).to.equal(0)
    expect(data.keystore).to.deep.equal({})
    expect(data.address).to.equal('')
    expect(data.keystoreJson).to.equal('')
    expect(data.host).to.equal('')
    expect(data.toAddress).to.equal('')
    expect(data.val).to.equal('')
    expect(data.gasPrice).to.equal('')
    expect(data.gasLimit).to.equal('')
    expect(data.gas).to.equal('')
    expect(data.result).to.equal('')
    expect(data.provider).to.deep.equal({})
    expect(data.hosts).to.deep.equal({})
    expect(data.nonce).to.equal('0')
    expect(data.chainId).to.equal('')
    expect(data.signedTransaction).to.equal('')
    expect(data.send).to.equal(false)
    expect(data.balance).to.equal('0')
  })

  it('should change hosts', () => {
    EtherTransaction.created()

    expect(EtherTransaction.hosts).to.deep.equal(config.hosts || {})
  })

  it('should have computed isKeystoreJsonValid', () => {
    expect(typeof EtherTransaction.computed.isKeystoreJsonValid)
      .to.equal('function')
  })

  it('should have computed isHostValid', () => {
    expect(typeof EtherTransaction.computed.isHostValid)
      .to.equal('function')
  })

  it('should have computed isToAddressValid', () => {
    expect(typeof EtherTransaction.computed.isToAddressValid)
      .to.equal('function')
  })

  it('should have method failed', () => {
    expect(typeof EtherTransaction.methods.failed)
      .to.equal('function')
  })

  it('should have method success', () => {
    expect(typeof EtherTransaction.methods.success)
      .to.equal('function')
  })

  it('should have method getNonce', () => {
    expect(typeof EtherTransaction.methods.getNonce)
      .to.equal('function')
  })

  it('should have method importWallet', () => {
    expect(typeof EtherTransaction.methods.importWallet)
      .to.equal('function')
  })

  it('should have method readKeystoreJsonFile', () => {
    expect(typeof EtherTransaction.methods.readKeystoreJsonFile)
      .to.equal('function')
  })

  it('should have method newProvider', () => {
    expect(typeof EtherTransaction.methods.newProvider)
      .to.equal('function')
  })

  it('should have method signTransaction', () => {
    expect(typeof EtherTransaction.methods.signTransaction)
      .to.equal('function')
  })

  it('should have method sendTransaction', () => {
    expect(typeof EtherTransaction.methods.sendTransaction)
      .to.equal('function')
  })

  it('should have method resetProvider', () => {
    expect(typeof EtherTransaction.methods.resetProvider)
      .to.equal('function')
  })

  it('should have method selectHost', () => {
    expect(typeof EtherTransaction.methods.selectHost)
      .to.equal('function')
  })

  it('should check keystoreJson and keystoreJson input class and keystoreJson help text', (done) => {
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = inValidKeystoreJson
    expect(vm.isKeystoreJsonValid)
      .to.equal(false)

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#file-seed').classList.contains('is-danger'))
        .to.equal(true)
      expect(vm.$el.querySelector('.help.is-danger.file-help').textContent.trim())
        .to.equal('Keystore JSON isn\'t valid')

      vm.keystoreJson = validKeystoreJson
      expect(vm.isKeystoreJsonValid)
        .to.equal(true)

      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#file-seed').classList.contains('is-success'))
          .to.equal(true)
        expect(vm.$el.querySelector('.help.is-success.file-help').textContent.trim())
        .to.equal('Keystore JSON is valid')
        done()
      })
    })
  })

  it('should render check out keystore json error contents', (done) => {
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = inValidKeystoreJson
    vm.failed(weakPassword)

    Vue.nextTick(() => {
      vm.importWallet()

      Vue.nextTick(() => {
        expect(vm.error)
          .to.equal(true)
        expect(vm.msg)
          .to.equal('Please check out keystore file (make sure either the format is json and the file extension is .json).')
        done()
      })
    })
  })

  it('should render enter password error contents', (done) => {
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = validKeystoreJson
    vm.password = ''
    vm.importWallet()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Please enter password!')
      done()
    })
  })

  it('should render not strong error contents', (done) => {
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = validKeystoreJson
    vm.failed(weakPassword)

    Vue.nextTick(() => {
      vm.importWallet()

      Vue.nextTick(() => {
        expect(vm.error)
          .to.equal(true)
        expect(vm.msg)
          .to.equal('Password is not strong, please change!')
        done()
      })
    })
  })

  it('should create valid keystore', function (done) {
    // 6 mins
    this.timeout(360000)

    const vm = new Constructor({}).$mount()

    vm.keystoreJson = validKeystoreJson
    vm.success(strongPassword)

    Vue.nextTick(() => {
      vm.importWallet()

      Vue.nextTick(() => {
        expect(vm.error)
          .to.equal(false)
        expect(vm.msg)
          .to.equal('Wallet import successfully!')
        expect(typeof vm.keystore.getAddress)
          .to.equal('function')
        expect(vm.address)
          .to.equal('0x149a7dff81ecee54652e57e97b0ce2f80763e9fe')
        done()
      })
    })
  })

  it('should render empty host error content', function (done) {
    const vm = new Constructor({}).$mount()

    vm.signTransaction()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Please enter host')
      done()
    })
  })

  it('should render empty to address error content', function (done) {
    const vm = new Constructor({}).$mount()

    vm.host = host.rpcUri
    vm.signTransaction()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Please enter to address')
      done()
    })
  })

  it('should sigh a ether transaction', function (done) {
    // 6 mins
    this.timeout(360000)

    const vm = new Constructor({}).$mount()

    vm.keystoreJson = validKeystoreJson
    vm.success(strongPassword)

    Vue.nextTick(() => {
      vm.importWallet()

      Vue.nextTick(() => {
        expect(vm.error)
          .to.equal(false)
        expect(vm.msg)
          .to.equal('Wallet import successfully!')
        expect(typeof vm.keystore.getAddress)
          .to.equal('function')
        expect(vm.address)
          .to.equal('0x149a7dff81ecee54652e57e97b0ce2f80763e9fe')

        vm.toAddress = '0x149a7dff81ecee54652e57e97b0ce2f80763e9ee'
        vm.host = host.rpcUri
        vm.chainId = host.chainId
        vm.val = 10000
        vm.nonce = 1
        vm.gas = 21000
        vm.gasLimit = 21000
        vm.gasPrice = 1

        vm.signTransaction()

        Vue.nextTick(() => {
          expect(/^0x[a-fA-F0-9]+$/.test(vm.signedTransaction))
            .to.equal(true)
          done()
        })
      })
    })
  })
})
