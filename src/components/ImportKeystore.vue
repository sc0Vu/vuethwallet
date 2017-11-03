<template>
  <div class="panel">
    <h2 class="panel-heading">Import Keystore Wallet App</h2>

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
        <!-- <div class="columns">
          <div class="column is-one-quarter">
            <label class="label" for="text-seed">Keystore JSON(Enter text)</label>
          </div>
        
          <div class="column is-third-quarter">
            <div class="control">
              <input id="text-seed" class="input" type="text" v-model="keystoreJson" placeholder="Keystore JSON" v-bind:class="{'is-danger': ((!isKeystoreJsonValid && keystoreJson) || error), 'is-success': isKeystoreJsonValid}">
              <p class="help is-danger" v-if="!isKeystoreJsonValid && keystoreJson">Keystore JSON isn't valid</p>
              <p class="help is-success" v-if="isKeystoreJsonValid">Keystore JSON is valid</p>
            </div>
          </div>
        </div> -->

        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label" for="file-seed">Keystore JSON(Choose file)</label>
          </div>
        
          <div class="column is-third-quarter">
            <div class="control">
              <input id="file-seed" class="input" type="file" v-on:change="readKeystoreJsonFile" placeholder="Keystore JSON" v-bind:class="{'is-danger': (!isKeystoreJsonValid && keystoreJson), 'is-success': isKeystoreJsonValid}">
              <p class="help is-danger file-help" v-if="!isKeystoreJsonValid && keystoreJson">Keystore JSON isn't valid</p>
              <p class="help is-success file-help" v-if="isKeystoreJsonValid">Keystore JSON is valid</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block has-text-centered" v-if="address">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <p>Address</p>
          </div>
          <div class="column is-three-quarter">
            <p>{{ address }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block has-text-centered">
      <div class="container">
        <button class="button is-primary file-button" v-on:click.prevent.self="importWallet">Import Wallet</button>
      </div>
    </div>
  </div>
</template>

<script>
import zxcvbn from 'zxcvbn'
import lightwallet from 'eth-lightwallet'
import Message from '@/components/Message'
import PasswordInput from '@/components/PasswordInput'

export default {
  name: 'import-keystore',
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
      keystoreJson: ''
    }
  },
  computed: {
    isKeystoreJsonValid () {
      if (!this.keystoreJson) {
        return false
      }
      try {
        JSON.parse(this.keystoreJson)
      } catch (e) {
        return false
      }
      return true
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
    newAddress (password) {
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
        this.error = false
        this.msg = 'Wallet import successfully!'
      }.bind(this))
    },
    importWallet () {
      if (!this.isKeystoreJsonValid) {
        this.error = true
        this.msg = 'Please check out keystore.json!'
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
      this.error = false

      var keystore = lightwallet.keystore.deserialize(this.keystoreJson)

      if (keystore) {
        this.keystore = keystore
        this.newAddress(this.password)
      } else {
        this.error = true
        this.msg = 'Please enter valid keystore json'
      }
    },
    readKeystoreJsonFile (e) {
      var files = e.target.files

      if (files.length > 1) {
        this.error = true
        this.msg = 'Please choose only one file'
        return
      }
      if (!/(.*)\.json/.test(files[0].name)) {
        this.error = true
        this.msg = 'Please choose valid keystore json'
        return
      }
      var reader = new FileReader()

      reader.onload = function (e) {
        this.keystoreJson = e.target.result
      }.bind(this)

      reader.onerror = function (e) {
        this.error = true
        this.msg = 'Something wrong happened!'
      }.bind(this)

      reader.readAsText(files[0])
    }
  }
}
</script>
