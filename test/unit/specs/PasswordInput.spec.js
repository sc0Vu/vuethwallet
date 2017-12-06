import Vue from 'vue'
import PasswordInput from '@/components/PasswordInput'

describe('PasswordInput.vue', () => {
  var weakPassword = 'aaaaaaaa'
  var strongPassword = 'qwfgzxjk123'
  const Constructor = Vue.extend(PasswordInput)

  it('should have password-input name', () => {
    expect(PasswordInput.name)
      .to.equal('password-input')
  })

  it('should have default data', () => {
    const data = PasswordInput.data()

    expect(data.error).to.equal(false)
    expect(data.password).to.equal('')
    expect(data.type).to.equal('text')
    expect(data.buttonText).to.equal('Hide')
    expect(data.score).to.equal(0)
  })

  it('should have computed isPasswordValid', () => {
    expect(typeof PasswordInput.computed.isPasswordValid)
      .to.equal('function')
  })

  it('should have computed emptyPassword', () => {
    expect(typeof PasswordInput.computed.emptyPassword)
      .to.equal('function')
  })

  it('should have method switchType', () => {
    expect(typeof PasswordInput.methods.switchType)
      .to.equal('function')
  })

  it('should have method checkPassword', () => {
    expect(typeof PasswordInput.methods.checkPassword)
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
      expect(vm.$el.querySelector('.help.is-danger.password-help > .password-help-msg').textContent.trim())
        .to.equal('Weak Password')
      expect(vm.$el.querySelector('.help.is-danger.password-help > .password-help-suggestions').textContent.trim())
        .to.equal('Suggestions: Add another word or two. Uncommon words are better.,Avoid repeated words and characters')
      expect(vm.$el.querySelector('.help.is-danger.password-help > .password-help-warning').textContent.trim())
        .to.equal('Warning: Repeats like "aaa" are easy to guess')
      expect(vm.score)
        .to.equal(0)

      vm.password = '    '
      vm.checkPassword()

      Vue.nextTick(() => {
        expect(vm.$el.querySelector('#pass').classList.contains('is-danger'))
        .to.equal(true)
        expect(vm.$el.querySelector('.help.is-danger.password-help > .password-help-msg').textContent.trim())
          .to.equal('Weak Password')
        expect(vm.$el.querySelector('.help.is-danger.password-help > .password-help-suggestions').textContent.trim())
          .to.equal('Suggestions: Add another word or two. Uncommon words are better.,Avoid repeated words and characters')
        expect(vm.$el.querySelector('.help.is-danger.password-help > .password-help-warning').textContent.trim())
          .to.equal('Warning: Repeats like "aaa" are easy to guess')
        expect(vm.score)
          .to.equal(0)

        vm.password = strongPassword
        vm.checkPassword()

        Vue.nextTick(() => {
          expect(vm.$el.querySelector('#pass').classList.contains('is-success'))
            .to.equal(true)
          expect(vm.$el.querySelector('.help.is-success.password-help > .password-help-msg').textContent.trim())
          .to.equal('Strong Password')
          expect(vm.score > 0)
            .to.equal(true)
          done()
        })
      })
    })
  })
})
