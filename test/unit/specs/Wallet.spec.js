import Vue from 'vue'
import Wallet from '@/components/Wallet'

describe('Wallet.vue', () => {
  it('should have wallet name', () => {
    expect(Wallet.name)
      .to.equal('wallet')
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
    // expect(data.keystore).to.equal({})
    expect(data.address).to.equal('')
    expect(data.randomSeed).to.equal('')
    expect(data.privateKey).to.equal('')
    expect(data.keystoreJson).to.equal('')
    expect(data.keystoreJsonDataLink).to.equal('')
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

    vm.password = 'aaaaaaaa'
    expect(vm.$el.querySelector('#pass').type)
      .to.equal('text')
    expect(vm.$el.querySelector('.button.is-info.password-button').textContent.trim())
      .to.equal('Hide')
    vm.switchType()

    Vue.nextTick(() => {
      vm.password = 'aaaaaaaa'
      expect(vm.$el.querySelector('#pass').type)
        .to.equal('password')
      expect(vm.$el.querySelector('.button.is-info.password-button').textContent.trim())
      .to.equal('Show')
    })
  })

  it('should change password input class and password help text', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.password = 'aaaaaaaa'
    vm.checkPassword()

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#pass').classList.has('is-danger'))
        .to.equal(true)
      expect(vm.$el.querySelector('.help.is-danger.password-help').textContent.trim())
        .to.equal('Weak Password')
      vm.password = 'adskvnjsklfbnskglkljdgnbmvmv'
      vm.checkPassword()

      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#pass').classList.has('is-success'))
          .to.equal(true)
        expect(vm.$el.querySelector('.help.is-success.password-help').textContent.trim())
        .to.equal('Strong Password')
      })
    })
  })

  it('should check password', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.password = 'aaasdcahhnhghnmfmjf'
    expect(vm.score)
      .to.equal(0)

    vm.checkPassword()

    Vue.nextTick(() => {
      vm.password = 'aaaaaaaa'
      expect(vm.score > 0)
        .to.equal(true)
    })
  })

  it('shouldn\'t create wallet', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.password = 'aaasdcahhnhghnmfmjf'
    expect(vm.newAddress(vm.password))
      .to.equal(false)
  })

  it('should render enter password error contents', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

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

    vm.password = 'aaaaaaaa'
    vm.generate()
    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.msg)
        .to.equal('Password is not strong, please change!')
    })
  })

  it('should create valid random seed', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.password = 'asdfvaasdfvaabgbdfaa'
    vm.generate()
    Vue.nextTick(() => {
      var randomSeed = vm.randomSeed.split(' ')

      expect(vm.error)
        .to.equal(false)
      expect(vm.msg)
        .to.equal('')
      expect(randomSeed.length)
        .to.equal(12)
    })
  })
})
