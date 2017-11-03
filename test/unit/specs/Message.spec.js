import Vue from 'vue'
import Message from '@/components/Message'

describe('Message.vue', () => {
  const Constructor = Vue.extend(Message)

  it('should have message name', () => {
    expect(Message.name)
      .to.equal('message')
  })

  it('should have two props', () => {
    expect(Message.props.message)
      .to.not.equal(undefined)
    expect(Message.props.error)
      .to.not.equal(undefined)
  })

  it('should have method clearMessage', () => {
    expect(typeof Message.methods.clearMessage)
      .to.equal('function')
  })

  it('should render error contents', () => {
    const vm = new Constructor({propsData: {
      error: true,
      message: 'Error'
    }}).$mount()
    expect(vm.$el.textContent.trim())
      .to.equal('Error')
  })

  it('should render success contents', () => {
    const vm = new Constructor({propsData: {
      error: false,
      message: 'Success'
    }}).$mount()
    expect(vm.$el.textContent.trim())
      .to.equal('Success')
  })
})
