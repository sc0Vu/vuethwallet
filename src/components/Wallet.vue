<template>
  <div class="panel">
    <h2 class="panel-heading">Create Wallet App</h2>

    <div class="panel-block" v-if="msg">
      <div class="container">
        <message v-bind:message="msg" v-bind:error="error" v-on:update:msg="val => msg = val"></message>
      </div>
    </div>

    <div class="panel-block">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label" for="pass">Password</label>
          </div>
        
          <div class="column is-half">
            <div class="control">
              <input id="pass" class="input" type="text" v-model="password" placeholder="Password" v-on:change.prevent.self="checkPassword" v-if="type === 'text'" v-bind:class="{'is-danger': ((score < 3 && password) || error), 'is-success': (score >= 3 && password)}">
              <input id="pass" class="input" type="password" v-model="password" placeholder="Password" v-on:change.prevent.self="checkPassword" v-if="type === 'password'" v-bind:class="{'is-danger': ((score < 3 && password) || error), 'is-success': (score >= 3 && password)}">
              <p class="help is-danger" v-if="score < 3 && password">Weak Password</p>
              <p class="help is-success" v-if="score >= 3 && password">Strong Password</p>
            </div>
          </div>

          <div class="column is-one-quarter">
            <button class="button is-info" v-on:click.prevent.self="switchType">{{ buttonText }}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block has-text-centered">
      <div class="container">
        <button class="button is-primary" v-on:click.prevent.self="generate">Generate Wallet</button>
      </div>
    </div>

    <div class="panel-block has-text-centered" v-if="address">
      <div class="container">
        <p>Random Seed</p>
        <p>{{ randomSeed }}</p>
        <p>Address</p>
        <p>{{ address }}</p>
        <p>Privatekey</p>
        <p>{{ privateKey }}</p>
        <p>Keystore JSON <a download="keystore.json" v-bind:href="keystoreJsonDataLink" v-if="keystoreJsonDataLink">Download</a></p>
        <!-- <p>{{ keystoreJson }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import zxcvbn from 'zxcvbn'
import lightwallet from 'eth-lightwallet'
import Message from '@/components/Message'

export default {
  name: 'wallet',
  components: {
    Message
  },
  data () {
    return {
      msg: '',
      error: false,
      password: '',
      type: 'text',
      buttonText: 'hidden',
      score: 0,
      keystore: {},
      address: '',
      randomSeed: '',
      privateKey: '',
      keystoreJson: '',
      keystoreJsonDataLink: ''
    }
  },
  methods: {
    clearMsg () {
      this.msg = ''
    },
    switchType () {
      if (this.type === 'text') {
        this.type = 'password'
        this.buttonText = 'Show'
      } else {
        this.type = 'text'
        this.buttonText = 'Hide'
      }
    },
    checkPassword () {
      var result = zxcvbn(this.password)

      this.score = result.score
    },
    newAddress (password) {
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
      }.bind(this))
    },
    generate () {
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

      // var extraEntropy = 'testentropy'
      // var randomSeed = lightwallet.keystore.generateRandomSeed(extraEntropy)
      var randomSeed = lightwallet.keystore.generateRandomSeed()

      // console.log(this.password, extraEntropy, randomSeed)
      this.randomSeed = randomSeed
      // console.log(this.password, randomSeed)

      lightwallet.keystore.createVault({password: this.password, seedPhrase: randomSeed, hdPathString: "m/44'/60'/0'/0"}, function (err, keystore) {
        if (err) {
          this.error = true
          this.msg = 'Something wrong happened!'
          throw err
        }
        // console.log(keystore)

        this.keystore = keystore
        this.newAddress(this.password)
      }.bind(this))
    }
  }
}
</script>
