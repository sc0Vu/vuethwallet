import Vue from 'vue'
import ImportKeystore from '@/views/eth/ImportKeystore'
import zxcvbn from 'zxcvbn'

describe('ImportKeystore.vue', function () {
  const weakPassword = zxcvbn('aaaaaaaa')
  const strongPassword = zxcvbn('qwfgzxjk123')
  const validKeystoreJson = `{"version":3,"id":"884a5d82-b733-4439-bd77-da963d843533","address":"149a7dff81ecee54652e57e97b0ce2f80763e9fe","crypto":{"ciphertext":"a7b99127257b2d7e9c240190f9476a973a424976342652be7746f6fb51bcdf63","cipherparams":{"iv":"755a411527608ed95d6c0e273a70b303"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"38fd8be9dc52df2a906129abbc6269408e1c2133996b34e2371099ef6c544a99","n":262144,"r":8,"p":1},"mac":"f6f6ee7d755c841b9b9382563e112a47e172e53da8c36533adacaf80db5c6cac"}}`
  const inValidKeystoreJson = '{version:1}}'
  const Constructor = Vue.extend(ImportKeystore)

  it('should have import-keystore name', () => {
    expect(ImportKeystore.name)
      .to.equal('import-keystore')
  })

  it('should have message components', () => {
    expect(typeof ImportKeystore.components.Message)
      .to.equal('object')
  })

  it('should have password input components', () => {
    expect(typeof ImportKeystore.components.PasswordInput)
      .to.equal('object')
  })

  it('should have default data', () => {
    const data = ImportKeystore.data()

    expect(data.password).to.equal('')
    expect(data.type).to.equal('text')
    expect(data.buttonText).to.equal('Hide')
    expect(data.score).to.equal(0)
    expect(data.keystore).to.deep.equal({})
    expect(data.address).to.equal('')
    expect(data.keystoreJson).to.equal('')
  })

  it('should have computed isKeystoreJsonValid', () => {
    expect(typeof ImportKeystore.computed.isKeystoreJsonValid)
      .to.equal('function')
  })

  it('should have method failed', () => {
    expect(typeof ImportKeystore.methods.failed)
      .to.equal('function')
  })

  it('should have method success', () => {
    expect(typeof ImportKeystore.methods.success)
      .to.equal('function')
  })

  it('should have method importWallet', () => {
    expect(typeof ImportKeystore.methods.importWallet)
      .to.equal('function')
  })

  it('should have method readKeystoreJsonFile', () => {
    expect(typeof ImportKeystore.methods.readKeystoreJsonFile)
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
})
