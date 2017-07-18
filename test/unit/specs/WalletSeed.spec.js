import Vue from 'vue'
import Wallet from '@/components/WalletSeed'

describe('Wallet.vue', () => {
  var weakPassword = 'aaaaaaaa'
  var strongPassword = 'adskvnjsklfbnskglkljdgnbmvmv'
  var validSeed = 'donor supreme valley slight promote impose guard sunny snap shiver bag bamboo'
  var invalidSeed = 'promote impose guard sunny snap shiver bag bamboo'

  it('should have wallet name', () => {
    expect(Wallet.name)
      .to.equal('wallet-seed')
  })

  it('should have message components', () => {
    expect(typeof Wallet.components.Message)
      .to.equal('object')
  })

  it('shold have data', () => {
    var data = Wallet.data()

    expect(data.msg).to.equal('')
    expect(data.error).to.equal(false)
    expect(data.password).to.equal('')
    expect(data.type).to.equal('text')
    expect(data.buttonText).to.equal('Hide')
    expect(data.score).to.equal(0)
    expect(data.keystore).to.deep.equal({})
    expect(data.address).to.equal('')
    expect(data.randomSeed).to.equal('')
    expect(data.privateKey).to.equal('')
    expect(data.keystoreJson).to.equal('')
    expect(data.keystoreJsonDataLink).to.equal('')
  })

  it('should have computed isSeedValid', () => {
    expect(typeof Wallet.computed.isSeedValid)
      .to.equal('function')
  })

  it('should have method switchType', () => {
    expect(typeof Wallet.methods.switchType)
      .to.equal('function')
  })

  it('should have method checkPassword', () => {
    expect(typeof Wallet.methods.checkPassword)
      .to.equal('function')
  })

  it('should have method newAddress', () => {
    expect(typeof Wallet.methods.newAddress)
      .to.equal('function')
  })

  it('should have method generate', () => {
    expect(typeof Wallet.methods.generate)
      .to.equal('function')
  })

  it('should change password input type and password button text', () => {
    const Constructor = Vue.extend(Wallet)
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
    const Constructor = Vue.extend(Wallet)
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

  it('should check randomSeed and randomSeed input class and randomSeed help text', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.randomSeed = invalidSeed
    expect(vm.isSeedValid)
      .to.equal(false)

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#seed').classList.has('is-danger'))
        .to.equal(true)
      expect(vm.$el.querySelector('.help.is-danger.seed-help').textContent.trim())
        .to.equal('Random Seed isn\'t valid')

      vm.randomSeed = validSeed
      expect(vm.isSeedValid)
        .to.equal(true)

      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#seed').classList.has('is-success'))
          .to.equal(true)
        expect(vm.$el.querySelector('.help.is-success.seed-help').textContent.trim())
        .to.equal('Random Seed is valid')
      })
    })
  })

  it('shouldn\'t create wallet', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.password = strongPassword
    expect(vm.newAddress(vm.password))
      .to.equal(false)
  })

  it('should render check out random seed error contents', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.randomSeed = invalidSeed
    vm.password = weakPassword
    vm.generate()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Please check out random seed!')
    })
  })

  it('should render enter password error contents', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.randomSeed = validSeed
    vm.password = ''
    vm.generate()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Please enter password!')
    })
  })

  it('should render not strong error contents', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.randomSeed = validSeed
    vm.password = weakPassword
    vm.generate()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Password is not strong, please change!')
    })
  })

  it('should create valid keystore', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.randomSeed = validSeed
    vm.password = strongPassword
    vm.generate()
    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(false)
      expect(vm.msg)
        .to.equal('')
      expect(typeof vm.keystore.getAddresses)
        .to.equal('function')
    })
  })

  it('should create a valid address', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.password = strongPassword
    vm.randomSeed = validSeed
    vm.newAddress(vm.password)
    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(false)
      expect(vm.msg)
        .to.equal('Wallet create successfully!')
      expect(vm.address.length > 0).toBe(true)
      expect(vm.privateKey.length > 0).toBe(true)
      expect(vm.keystoreJson.length > 0).toBe(true)
      expect(vm.keystoreJsonDataLink.length > 0).toBe(true)
      expect(vm.$el.querySelector('.button.is-danger.download-button').textContent.trim())
      .to.equal('Download')
    })
  })
})
