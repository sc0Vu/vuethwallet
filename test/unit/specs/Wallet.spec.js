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
    expect(data.buttonText).to.equal('hidden')
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

  it('should render error contents', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.password = ''
    vm.generate()

    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.message)
        .to.equal('Please enter password!')
    })

    vm.password = 'aaaaaaaa'
    vm.generate()
    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(true)
      expect(vm.message)
        .to.equal('Password is not strong, please change!')
    })
  })
  
  it('should render success contents', () => {
    const Constructor = Vue.extend(Wallet)
    const vm = new Constructor({}).$mount()

    vm.password = 'asdfvaasdfvaabgbdfaa'
    vm.generate()
    Vue.nextTick(() => {
      expect(vm.error)
        .to.equal(false)
      expect(vm.message)
        .to.equal('Wallet create successfully!')
    })
  })
})
