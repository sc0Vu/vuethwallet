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
        <div class="columns">
          <div class="column is-one-quarter">
            <p>Random Seed</p>
          </div>
          <div class="column is-three-quarter">
            <p>{{ randomSeed }}</p>
          </div>
        </div>
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
        <a class="button is-danger download-button" download="keystore.json" v-bind:href="keystoreJsonDataLink" v-if="keystoreJsonDataLink">Download</a>
      </div>
    </div>
  </div>
</template>

<script>
import lightwallet from 'eth-lightwallet'
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
      keystoreJsonDataLink: ''
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
      return lightwallet.keystore.isSeedValid(this.randomSeed)
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
      if (typeof this.keystore.getAddresses !== 'function') {
        return false
      }
      this.keystore.keyFromPassword(password, function (err, pwDerivedKey) {
        if (err) {
          this.error = true
          this.msg = 'Something wrong happened!'
          throw err
        }
        this.keystore.generateNewAddress(pwDerivedKey, 1)

        var address = this.keystore.getAddresses()[0]

        this.address = '0x' + address
        // console.log(pwDerivedKey, this.keystore.serialize())
        this.privateKey = this.keystore.exportPrivateKey(address, pwDerivedKey)
        this.keystoreJson = this.keystore.serialize()
        this.keystoreJsonDataLink = encodeURI('data:application/json;charset=utf-8,' + this.keystoreJson)

        this.error = false
        this.msg = 'Wallet create successfully!'

        callback()
      }.bind(this))
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

      lightwallet.keystore.createVault({password: this.password, seedPhrase: this.randomSeed, hdPathString: "m/44'/60'/0'/0"}, function (err, keystore) {
        if (err) {
          this.error = true
          this.msg = 'Something wrong happened!'
          throw err
        }
        // console.log(keystore)

        this.keystore = keystore
        this.newAddress(this.password, callback)
      }.bind(this))
    }
  }
}
</script>
