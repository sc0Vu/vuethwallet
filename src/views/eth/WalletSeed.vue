<template>
  <div class="panel">
    <h2 class="panel-heading">Create Wallet - Mnemonic</h2>

    <div class="panel-block">
      <div class="container">
        <password-input v-on:failed="failed" v-on:success="success"></password-input>
      </div>
    </div>
    
    <div class="panel-block">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label" for="seed">Mnemonic (12 words)</label>
          </div>
        
          <div class="column is-third-quarter">
            <div class="control">
              <input id="seed" class="input" type="text" v-model="randomSeed" placeholder="Mnemonic (12 words)" v-bind:class="{'is-danger': (!isSeedValid && randomSeed), 'is-success': (isSeedValid && randomSeed)}">
              <p class="help is-danger seed-help" v-if="!isSeedValid && randomSeed">Mnemonic isn't valid</p>
              <p class="help is-success seed-help" v-if="isSeedValid && randomSeed">Mnemonic is valid</p>
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
        <button class="button is-primary" v-bind:disabled="working" v-on:click.prevent.self="generate">Generate Wallet</button>
        <a class="button is-danger download-button" v-bind:download="fileName" v-bind:href="keystoreJsonDataLink" v-if="keystoreJsonDataLink">Download</a>
      </div>
    </div>
  </div>
</template>

<script>
import yoethwallet from 'yoethwallet'
import PasswordInput from '@/components/PasswordInput'
import { mapActions } from 'vuex'

export default {
  name: 'wallet-seed',
  components: {
    PasswordInput
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
      fileName: '',
      working: false
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
      return yoethwallet.wallet.validSeed(this.randomSeed)
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
      if (typeof this.keystore.getHexAddress !== 'function') {
        return false
      }

      let wallet = this.keystore

      this.notify({ text: 'Wallet create successfully!', class: 'is-info' })
      this.privateKey = wallet.getHexPrivateKey()
      this.address = wallet.getHexAddress(true)

      wallet.toV3String(this.password, {}, (err, v3Json) => {
        if (err) {
          this.notify({ text: 'Couldn\'t stringify wallet, error: ' + err.message, class: 'is-danger' })
          return
        }
        this.keystoreJson = v3Json
        this.keystoreJsonDataLink = encodeURI('data:application/json;charset=utf-8,' + this.keystoreJson)
        this.fileName = `${wallet.getV3Filename()}.json`
        callback()
      })
    },
    generate (callback) {
      if (!this.password) {
        this.notify({ text: 'Please enter valid password!', class: 'is-danger' })
        return
      }
      if (!this.isSeedValid) {
        this.notify({ text: 'Please check out random seed!', class: 'is-danger' })
        return
      }
      if (this.score < 3) {
        this.notify({ text: 'Password is not strong, please change!', class: 'is-danger' })
        return
      }
      if (!callback || typeof callback !== 'function') {
        callback = function () {
          this.working = false
        }.bind(this)
      }
      this.working = true

      window.setTimeout(function () {
        let wallet = yoethwallet.wallet

        wallet.generate(this.randomSeed, '', (err, keystore) => {
          if (err) {
            this.notify({ text: 'Couldn\'t create wallet, error: ' + err.message, class: 'is-danger' })
            return
          }
          this.keystore = keystore
          this.newAddress(this.password, callback)
        })
      }.bind(this), 100)
    },
    ...mapActions([
      'notify'
    ])
  }
}
</script>
