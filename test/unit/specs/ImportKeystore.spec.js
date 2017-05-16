import Vue from 'vue'
import ImportKeystore from '@/components/ImportKeystore'

describe('ImportKeystore.vue', () => {
  var weakPassword = 'aaaaaaaa'
  var strongPassword = 'adskvnjsklfbnskglkljdgnbmvmv'
  var validKeystoreJson = '{version:1}'
  var inValidKeystoreJson = '{version:1}}'

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

  it('should change password input type and password button text', () => {
    const Constructor = Vue.extend(ImportKeystore)
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
    })
  })

  it('should check password and change password input class and password help text', () => {
    const Constructor = Vue.extend(ImportKeystore)
    const vm = new Constructor({}).$mount()

    vm.password = weakPassword
    vm.checkPassword()

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#pass').classList.has('is-danger'))
        .to.equal(true)
      expect(vm.$el.querySelector('.help.is-danger.password-help').textContent.trim())
        .to.equal('Weak Password')
      expect(vm.score)
        .to.equal(0)

      vm.password = strongPassword
      vm.checkPassword()

      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#pass').classList.has('is-success'))
          .to.equal(true)
        expect(vm.$el.querySelector('.help.is-success.password-help').textContent.trim())
        .to.equal('Strong Password')
        expect(vm.score > 0)
          .to.equal(true)
      })
    })
  })

  it('should check keystoreJson and keystoreJson input class and keystoreJson help text', () => {
    const Constructor = Vue.extend(ImportKeystore)
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = inValidKeystoreJson
    expect(vm.isKeystoreJsonValid)
      .to.equal(false)

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#file-seed').classList.has('is-danger'))
        .to.equal(true)
      expect(vm.$el.querySelector('.help.is-danger.file-help').textContent.trim())
        .to.equal('Keystore JSON isn\'t valid')

      vm.keystoreJson = validKeystoreJson
      expect(vm.isKeystoreJsonValid)
        .to.equal(true)

      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#file-seed').classList.has('is-success'))
          .to.equal(true)
        expect(vm.$el.querySelector('.help.is-success.file-help').textContent.trim())
        .to.equal('Keystore JSON is valid')
      })
    })
  })

  it('shouldn\'t create wallet', () => {
    const Constructor = Vue.extend(ImportKeystore)
    const vm = new Constructor({}).$mount()

    vm.password = strongPassword
    expect(vm.newAddress(vm.password))
      .to.equal(false)
  })

  it('should render check out keystore json error contents', () => {
    const Constructor = Vue.extend(ImportKeystore)
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = inValidKeystoreJson
    vm.password = weakPassword
    vm.importWallet()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Please check out keystore.json!')
    })
  })

  it('should render enter password error contents', () => {
    const Constructor = Vue.extend(ImportKeystore)
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = validKeystoreJson
    vm.password = ''
    vm.importWallet()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Please enter password!')
    })
  })

  it('should render not strong error contents', () => {
    const Constructor = Vue.extend(ImportKeystore)
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = validKeystoreJson
    vm.password = weakPassword
    vm.importWallet()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Password is not strong, please change!')
    })
  })

  it('should create valid keystore', () => {
    const Constructor = Vue.extend(ImportKeystore)
    const vm = new Constructor({}).$mount()

    vm.keystoreJson = validKeystoreJson
    vm.password = strongPassword
    vm.importWallet()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(false)
      expect(vm.msg)
        .to.equal('')
      expect(typeof vm.keystore.getAddresses)
        .to.equal('function')
    })
  })
})
