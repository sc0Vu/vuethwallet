import Vue from 'vue'
import ImportKeystore from '@/components/ImportKeystore'

describe('ImportKeystore.vue', () => {
  var weakPassword = 'aaaaaaaa'
  var strongPassword = 'qwfgzxjk123'
  var validKeystoreJson = `{"encSeed":{"encStr":"2moi9N+h8FOSQtjYcJUU16JvsfUjUuuk4nTF9zstBBdcCFPSIt+qADANHzF3TC/ymZWznv0jJ79/hLKJaflZ6fmpj3r3QXpCanE+e4v0Z+rP13F30c8lvP07bs2cEA/L9vZ9cFfWTUUHASaBHO5DcAr/KCsyAS18O3XfBI5BndSV9wQwpbcK7g==","nonce":"APReXYjlFxwFojOrokJNfMyqEF6jWRm+"},"ksData":{"m/44'/60'/0'/0":{"info":{"curve":"secp256k1","purpose":"sign"},"encHdPathPriv":{"encStr":"3uuXiQafgv2YS+9byKg+A+jd2p9d0Hp0bdYwM0FZEVDpJtS8hfeMzrU4FrLd5XfSWxk9STLYfO25+SkSn8dTdaqRcCM2iBAbTA586gz8w+J7pOtu64UVVWWJZQrP5lhDZ5I1qLbCvii8Ztle88W+j4EcyYLnI6VtYbNw03K25A==","nonce":"nKvLwGxascn0BOhXoyD+HJUmWph95a89"},"hdIndex":1,"encPrivKeys":{"2204c25e6fffe8e07ac5592feebbaf1924288d58":{"key":"ZIwu490fDvgdc6vw1NoJyMCVNFSrXmZkq1ygo48Yfzc53g8Nxl2fUym+Qd6Iig/W","nonce":"IFbXBjljNK155NudIxiw9PIdGkN9+oh7"}},"addresses":["2204c25e6fffe8e07ac5592feebbaf1924288d58"]}},"encHdRootPriv":{"encStr":"KzXzKjM65BpnRaqhcxNUiG/zK5ubj4WP7hYcic1OE6lwAcpkho7p86Q7R5iAQH6B/KH3IDWCa4H1DjdU2N8osAu3RBBxGrroshzV8Im4PoICZd4TYQm4MAbFGKtK6Jsx3mPK8pwtzSr60bPPRWuO5KisM1nPmdbKd67A64TmVA==","nonce":"AUsD7f2cfk+l6sW0y9u+izzGtOuN+Q3h"},"salt":"zIRahLAdoe6GAB5xIYHOx7WGb+/3cnobAP0cywM1YZM=","version":2}`
  var inValidKeystoreJson = '{version:1}}'
  const Constructor = Vue.extend(ImportKeystore)

  it('should have import-keystore name', () => {
    expect(ImportKeystore.name)
      .to.equal('import-keystore')
  })

  it('should have message components', () => {
    expect(typeof ImportKeystore.components.Message)
      .to.equal('object')
  })

  it('shold have data', () => {
    var data = ImportKeystore.data()

    expect(data.msg).to.equal('')
    expect(data.error).to.equal(false)
    expect(data.password).to.equal('')
    expect(data.type).to.equal('text')
    expect(data.buttonText).to.equal('Hide')
    expect(data.score).to.equal(0)
    // expect(data.keystore).to.equal({})
    expect(data.address).to.equal('')
    expect(data.keystoreJson).to.equal('')
  })

  it('should have computed isKeystoreJsonValid', () => {
    expect(typeof ImportKeystore.computed.isKeystoreJsonValid)
      .to.equal('function')
  })

  it('should have method switchType', () => {
    expect(typeof ImportKeystore.methods.switchType)
      .to.equal('function')
  })

  it('should have method checkPassword', () => {
    expect(typeof ImportKeystore.methods.checkPassword)
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

  it('should change password input type and password button text', (done) => {
    const vm = new Constructor({}).$mount()

    vm.password = weakPassword
    expect(vm.$el.querySelector('#pass').type)
      .to.equal('text')
    expect(vm.$el.querySelector('.button.is-info.password-button').textContent.trim())
      .to.equal('Hide')
    vm.switchType()

    Vue.nextTick(() => {
      expect(vm.password)
        .to.equal(weakPassword)
      expect(vm.$el.querySelector('#pass').type)
        .to.equal('password')
      expect(vm.$el.querySelector('.button.is-info.password-button').textContent.trim())
      .to.equal('Show')
      done()
    })
  })

  it('should check password and change password input class and password help text', (done) => {
    const vm = new Constructor({}).$mount()

    vm.password = weakPassword
    vm.checkPassword()

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#pass').classList.contains('is-danger'))
        .to.equal(true)
      expect(vm.$el.querySelector('.help.is-danger.password-help').textContent.trim())
        .to.equal('Weak Password')
      expect(vm.score)
        .to.equal(0)

      vm.password = strongPassword
      vm.checkPassword()

      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#pass').classList.contains('is-success'))
          .to.equal(true)
        expect(vm.$el.querySelector('.help.is-success.password-help').textContent.trim())
        .to.equal('Strong Password')
        expect(vm.score > 0)
          .to.equal(true)
        done()
      })
    })
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

    vm.password = strongPassword
    expect(vm.newAddress(vm.password))
      .to.equal(false)
  })

  it('should render check out keystore json error contents', (done) => {
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = inValidKeystoreJson
    vm.password = weakPassword
    vm.checkPassword()
    vm.importWallet()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Please check out keystore.json!')
      done()
    })
  })

  it('should render enter password error contents', (done) => {
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = validKeystoreJson
    vm.password = ''
    vm.checkPassword()
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
    vm.password = weakPassword
    vm.checkPassword()
    vm.importWallet()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Password is not strong, please change!')
      done()
    })
  })

  it('should create valid keystore', (done) => {
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = validKeystoreJson
    vm.password = strongPassword
    vm.checkPassword()
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
