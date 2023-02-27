<template>
  <div class="panel">
    <h2 class="panel-heading">Import Keystore Wallet App</h2>

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

    <div class="panel-block" v-if="address">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <p>Address</p>
          </div>
          <div class="column is-three-quarter">
            <p>{{ address }}</p>
          </div>
        </div>
        <secret-text :labelText="'Privatekey'" :secretText="`0x${privateKey}`"></secret-text>
      </div>
    </div>

    <div class="panel-block has-text-centered">
      <div class="container">
        <button class="button is-primary file-button" v-bind:disabled="working" v-on:click.prevent.self="importWallet">Import Wallet</button>
      </div>
    </div>
  </div>
</template>

<script>
import yoethwallet from 'yoethwallet'
import Message from '@/components/Message'
import PasswordInput from '@/components/PasswordInput'
import SecretText from '@/components/SecretText'
import { mapActions } from 'vuex'

export default {
  name: 'import-keystore',
  components: {
    Message, PasswordInput, SecretText
  },
  data () {
    return {
      working: false,
      password: '',
      type: 'text',
      buttonText: 'Hide',
      score: 0,
      keystore: {},
      privateKey: '',
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
    importWallet () {
      if (!this.isKeystoreJsonValid) {
        this.notify({ text: 'Please check out keystore file (make sure either the format is json and the file extension is .json).', class: 'is-danger' })
        return
      }
      if (!this.password) {
        this.notify({ text: 'Please enter password!', class: 'is-danger' })
        return
      }
      if (this.score < 3) {
        this.notify({ text: 'Password is not strong, please change!', class: 'is-danger' })
        return
      }

      this.working = true

      window.setTimeout(function () {
        yoethwallet.wallet.fromV3String(this.keystoreJson, this.password, (err, keystore) => {
          if (!this.working) {
            return
          }
          this.working = false
          if (err) {
            this.notify({ text: 'Please enter valid keystore json!', class: 'is-danger' })
            console.warn(err.message)
            return
          }

          let wallet = keystore

          this.keystore = wallet
          this.privateKey = wallet.getHexPrivateKey()
          this.address = wallet.getHexAddress(true)
          this.notify({ text: 'Wallet import successfully!', class: 'is-info' })
        })
      }.bind(this), 100)
    },
    readKeystoreJsonFile (e) {
      var files = e.target.files

      if (files.length > 1) {
        this.notify({ text: 'Please choose only one file!', class: 'is-danger' })
        return
      }
      if (!/(.*)\.json/.test(files[0].name)) {
        this.notify({ text: 'Please choose valid keystore json (make sure the file extension is .json).', class: 'is-danger' })
        return
      }
      var reader = new FileReader()

      reader.onload = function (e) {
        this.keystoreJson = e.target.result
      }.bind(this)

      reader.onerror = function (e) {
        this.notify({ text: 'Something wrong happened!', class: 'is-danger' })
      }.bind(this)

      reader.readAsText(files[0])
    },
    ...mapActions([
      'notify'
    ])
  }
}
</script>
