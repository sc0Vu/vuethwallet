import Vue from 'vue'
import ImportKeystore from '@/components/ImportKeystore'
import zxcvbn from 'zxcvbn'

describe('ImportKeystore.vue', () => {
  const weakPassword = zxcvbn('aaaaaaaa')
  const strongPassword = zxcvbn('qwfgzxjk123')
  const validKeystoreJson = `{"encSeed":{"encStr":"2moi9N+h8FOSQtjYcJUU16JvsfUjUuuk4nTF9zstBBdcCFPSIt+qADANHzF3TC/ymZWznv0jJ79/hLKJaflZ6fmpj3r3QXpCanE+e4v0Z+rP13F30c8lvP07bs2cEA/L9vZ9cFfWTUUHASaBHO5DcAr/KCsyAS18O3XfBI5BndSV9wQwpbcK7g==","nonce":"APReXYjlFxwFojOrokJNfMyqEF6jWRm+"},"ksData":{"m/44'/60'/0'/0":{"info":{"curve":"secp256k1","purpose":"sign"},"encHdPathPriv":{"encStr":"3uuXiQafgv2YS+9byKg+A+jd2p9d0Hp0bdYwM0FZEVDpJtS8hfeMzrU4FrLd5XfSWxk9STLYfO25+SkSn8dTdaqRcCM2iBAbTA586gz8w+J7pOtu64UVVWWJZQrP5lhDZ5I1qLbCvii8Ztle88W+j4EcyYLnI6VtYbNw03K25A==","nonce":"nKvLwGxascn0BOhXoyD+HJUmWph95a89"},"hdIndex":1,"encPrivKeys":{"2204c25e6fffe8e07ac5592feebbaf1924288d58":{"key":"ZIwu490fDvgdc6vw1NoJyMCVNFSrXmZkq1ygo48Yfzc53g8Nxl2fUym+Qd6Iig/W","nonce":"IFbXBjljNK155NudIxiw9PIdGkN9+oh7"}},"addresses":["2204c25e6fffe8e07ac5592feebbaf1924288d58"]}},"encHdRootPriv":{"encStr":"KzXzKjM65BpnRaqhcxNUiG/zK5ubj4WP7hYcic1OE6lwAcpkho7p86Q7R5iAQH6B/KH3IDWCa4H1DjdU2N8osAu3RBBxGrroshzV8Im4PoICZd4TYQm4MAbFGKtK6Jsx3mPK8pwtzSr60bPPRWuO5KisM1nPmdbKd67A64TmVA==","nonce":"AUsD7f2cfk+l6sW0y9u+izzGtOuN+Q3h"},"salt":"zIRahLAdoe6GAB5xIYHOx7WGb+/3cnobAP0cywM1YZM=","version":2}`
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

  it('should have data', () => {
    var data = ImportKeystore.data()

    expect(data.msg).to.equal('')
    expect(data.error).to.equal(false)
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

  it('should have method newAddress', () => {
    expect(typeof ImportKeystore.methods.newAddress)
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

  it('shouldn\'t create wallet', () => {
    const vm = new Constructor({}).$mount()

    vm.success(strongPassword)

    expect(vm.newAddress(vm.password))
      .to.equal(false)
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
          .to.equal('Please check out keystore.json!')
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

  it('should create valid keystore', (done) => {
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = validKeystoreJson
    vm.success(strongPassword)

    Vue.nextTick(() => {
      vm.importWallet()

      Vue.nextTick(() => {
        expect(vm.error)
          .to.equal(false)
        expect(vm.msg)
          .to.equal('')
        expect(typeof vm.keystore.getAddresses)
          .to.equal('function')
        done()
      })
    })
  })
})
