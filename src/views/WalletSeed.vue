<template>
  <div class="panel">
    <h2 class="panel-heading">Create Wallet App - Seed</h2>

    <div class="panel-block" v-if="msg">
      <div class="container">
        <message v-bind:message="msg" v-bind:error="error" v-on:update:msg="val => msg = val"></message>
      </div>
    </div>

    <div class="panel-block">
      <div class="container">
        <password-input v-on:failed="failed" v-on:success="success"></password-input>
      </div>
    </div>
    
    <div class="panel-block">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label" for="seed">Random Seed</label>
          </div>
        
          <div class="column is-third-quarter">
            <div class="control">
              <input id="seed" class="input" type="text" v-model="randomSeed" placeholder="Random Seed" v-bind:class="{'is-danger': (!isSeedValid && randomSeed), 'is-success': (isSeedValid && randomSeed)}">
              <p class="help is-danger seed-help" v-if="!isSeedValid && randomSeed">Random Seed isn't valid</p>
              <p class="help is-success seed-help" v-if="isSeedValid && randomSeed">Random Seed is valid</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block" v-if="address">
      <div class="container">
        <!-- <div class="columns">
          <div class="column is-one-quarter">
            <p>Random Seed</p>
          </div>
          <div class="column is-three-quarter">
            <p>{{ randomSeed }}</p>
          </div>
        </div> -->
        <div class="columns">
          <div class="column is-one-quarter">
            <p>Address</p>
          </div>
          <div class="column is-three-quarter">
            <p>{{ address }}</p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-quarter">
            <p>Privatekey</p>
          </div>
          <div class="column is-three-quarter">
            <p>{{ privateKey }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block has-text-centered">
      <div class="container">
        <button class="button is-primary" v-on:click.prevent.self="generate">Generate Wallet</button>
        <a class="button is-danger download-button" v-bind:download="filename" v-bind:href="keystoreJsonDataLink" v-if="keystoreJsonDataLink">Download</a>
      </div>
    </div>
  </div>
</template>

<script>
import yoethwallet from 'yoethwallet'
import Message from '@/components/Message'
import PasswordInput from '@/components/PasswordInput'

export default {
  name: 'wallet-seed',
  components: {
    Message, PasswordInput
  },
  data () {
    return {
      msg: '',
      error: false,
      password: '',
      type: 'text',
      buttonText: 'Hide',
      score: 0,
      keystore: {},
      address: '',
      randomSeed: '',
      privateKey: '',
      keystoreJson: '',
      keystoreJsonDataLink: '',
      filename: ''
    }
  },
  computed: {
    isSeedValid () {
      if (!this.randomSeed) {
        return false
      }
      if (this.randomSeed.split(' ').length !== 12) {
        return false
      }
      return yoethwallet.wallet.validateSeed(this.randomSeed)
    }
  },
  methods: {
    failed (e) {
      this.score = e.score
      this.password = e.password
    },
    success (e) {
      this.score = e.score
      this.password = e.password
    },
    newAddress (password, callback) {
      if (typeof this.keystore.getAddress !== 'function') {
        return false
      }

      let wallet = this.keystore

      this.error = false
      this.msg = 'Wallet create successfully!'
      this.privateKey = wallet.getPrivateKey()
      this.address = wallet.getAddress()
      this.keystoreJson = wallet.toJson(this.password)
      this.keystoreJsonDataLink = encodeURI('data:application/json;charset=utf-8,' + this.keystoreJson)
      this.filename = `${wallet.getFilename()}.json`
      callback()
    },
    generate (callback) {
      if (!this.isSeedValid) {
        this.error = true
        this.msg = 'Please check out random seed!'
        return
      }
      if (!this.password) {
        this.error = true
        this.msg = 'Please enter password!'
        return
      }
      if (this.score < 3) {
        this.error = true
        this.msg = 'Password is not strong, please change!'
        return
      }
      if (!callback || typeof callback !== 'function') {
        callback = function () {}
      }

      let wallet = yoethwallet.wallet

      wallet.generate(this.randomSeed)

      this.keystore = wallet
      this.newAddress(this.password, callback)
    }
  }
}
</script>
