import Vue from 'vue'
import Wallet from '@/views/eth/WalletSeed'
import zxcvbn from 'zxcvbn'

describe('WalletSeed.vue', () => {
  const weakPassword = zxcvbn('aaaaaaaa')
  const strongPassword = zxcvbn('adskvnjsklfbnskglkljdgnbmvmv')
  const validSeed = 'donor supreme valley slight promote impose guard sunny snap shiver bag bamboo'
  const invalidSeed = 'promote impose guard sunny snap shiver bag bamboo'
  const Constructor = Vue.extend(Wallet)

  it('should have wallet name', function () {
    expect(Wallet.name)
      .to.equal('wallet-seed')
  })

  it('should have message components', () => {
    expect(typeof Wallet.components.Message)
      .to.equal('object')
  })

  it('should have password input components', () => {
    expect(typeof Wallet.components.PasswordInput)
      .to.equal('object')
  })

  it('shold have default data', () => {
    const data = Wallet.data()

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
    expect(data.fileName).to.equal('')
  })

  it('should have computed isSeedValid', () => {
    expect(typeof Wallet.computed.isSeedValid)
      .to.equal('function')
  })

  it('should have method failed', () => {
    expect(typeof Wallet.methods.failed)
      .to.equal('function')
  })

  it('should have method success', () => {
    expect(typeof Wallet.methods.success)
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

  it('should check randomSeed and randomSeed input class and randomSeed help text', (done) => {
    const vm = new Constructor({}).$mount()

    vm.randomSeed = invalidSeed
    expect(vm.isSeedValid)
      .to.equal(false)

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#seed').classList.contains('is-danger'))
        .to.equal(true)
      expect(vm.$el.querySelector('.help.is-danger.seed-help').textContent.trim())
        .to.equal('Random Seed isn\'t valid')

      vm.randomSeed = validSeed
      expect(vm.isSeedValid)
        .to.equal(true)

      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#seed').classList.contains('is-success'))
          .to.equal(true)
        expect(vm.$el.querySelector('.help.is-success.seed-help').textContent.trim())
        .to.equal('Random Seed is valid')
        done()
      })
    })
  })

  it('shouldn\'t create wallet due to there is no keystore', () => {
    const vm = new Constructor({}).$mount()

    vm.success(strongPassword)

    expect(vm.newAddress(vm.password))
      .to.equal(false)
  })

  it('should render check out random seed error contents', (done) => {
    const vm = new Constructor({}).$mount()

    vm.randomSeed = invalidSeed
    vm.failed(weakPassword)

    Vue.nextTick(() => {
      vm.generate()

      Vue.nextTick(() => {
        expect(vm.error)
          .to.equal(true)
        expect(vm.msg)
          .to.equal('Please check out random seed!')
        done()
      })
    })
  })

  it('should render enter password error contents', (done) => {
    const vm = new Constructor({}).$mount()

    vm.randomSeed = validSeed
    vm.password = ''
    vm.generate()

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

    vm.randomSeed = validSeed
    vm.failed(weakPassword)

    Vue.nextTick(() => {
      vm.generate()

      Vue.nextTick(() => {
        expect(vm.error)
          .to.equal(true)
        expect(vm.msg)
          .to.equal('Password is not strong, please change!')
        done()
      })
    })
  })

  it('should create a valid address', function (done) {
    // 6 mins
    this.timeout(360000)

    const vm = new Constructor({}).$mount()

    vm.success(strongPassword)
    vm.randomSeed = validSeed

    vm.generate(() => {
      Vue.nextTick(() => {
        expect(vm.error)
          .to.equal(false)
        expect(vm.msg)
          .to.equal('Wallet create successfully!')
        expect(vm.address.length > 0)
          .to.equal(true)
        expect(/^0x[a-fA-F0-9]{40}$/.test(vm.address))
          .to.equal(true)
        expect(vm.privateKey.length > 0)
          .to.equal(true)
        expect(vm.keystoreJson.length > 0)
          .to.equal(true)
        expect(vm.keystoreJsonDataLink.length > 0)
          .to.equal(true)
        expect(/^UTC\-\-(?:[a-zA-Z0-9\-\.]+)\-\-(?:[a-fA-F0-9]+)\.json$/.test(vm.fileName))
          .to.equal(true)
        expect(vm.$el.querySelector('.button.is-danger.download-button').textContent.trim())
          .to.equal('Download')
        done()
      })
    })
  })
})
