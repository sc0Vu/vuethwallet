import Vue from 'vue'
import Wallet from '@/views/eth/Wallet'
import zxcvbn from 'zxcvbn'

describe('Wallet.vue', function () {
  const weakPassword = zxcvbn('aaaaaaaa')
  const strongPassword = zxcvbn('adskvnjsklfbnskglkljdgnbmvmv')
  const Constructor = Vue.extend(Wallet)

  it('should have wallet name', () => {
    expect(Wallet.name)
      .to.equal('wallet')
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
    // expect(data.randomSeed).to.equal('')
    expect(data.privateKey).to.equal('')
    expect(data.keystoreJson).to.equal('')
    expect(data.keystoreJsonDataLink).to.equal('')
    expect(data.fileName).to.equal('')
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

  it('shouldn\'t create wallet due to there is no keystore', () => {
    const vm = new Constructor({}).$mount()

    vm.success(strongPassword)

    expect(vm.newAddress(vm.password))
      .to.equal(false)
  })

  it('should render enter password error contents', (done) => {
    const vm = new Constructor({}).$mount()

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

  // Due to we comment the random seed, this test doesn't need to execute.
  // it('should create valid random seed', (done) => {
  //   const vm = new Constructor({}).$mount()

  //   vm.success(strongPassword)

  //   Vue.nextTick(() => {
  //     vm.generate()

  //     Vue.nextTick(() => {
  //       const randomSeed = vm.randomSeed.split(' ')

  //       expect(vm.error)
  //         .to.equal(false)
  //       expect(vm.msg)
  //         .to.equal('')
  //       expect(randomSeed.length)
  //         .to.equal(12)
  //       done()
  //     })
  //   })
  // })

  it('should create a valid address', function (done) {
    // 6 mins
    this.timeout(360000)

    const vm = new Constructor({}).$mount()

    vm.success(strongPassword)

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
