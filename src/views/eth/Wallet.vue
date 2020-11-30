<template>
  <div class="panel">
    <h2 class="panel-heading">Create Wallet</h2>

    <div class="panel-block">
      <div class="container">
        <password-input v-on:failed="failed" v-on:success="success"></password-input>
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
        <button class="button is-primary" v-bind:disabled="working" v-on:click.prevent.self="generate">Generate Wallet</button>
        <a class="button is-danger download-button" v-bind:download="fileName" v-bind:href="keystoreJsonDataLink" v-if="keystoreJsonDataLink">Download</a>
      </div>
    </div>
  </div>
</template>

<script>
import yoethwallet from 'yoethwallet'
import Message from '@/components/Message'
import PasswordInput from '@/components/PasswordInput'
import { mapActions } from 'vuex'

export default {
  name: 'wallet',
  components: {
    Message, PasswordInput
  },
  data () {
    return {
      password: '',
      type: 'text',
      buttonText: 'Hide',
      score: 0,
      keystore: {},
      address: '',
      // randomSeed: '',
      privateKey: '',
      keystoreJson: '',
      keystoreJsonDataLink: '',
      hdPathString: 'm/44\'/60\'/0\'/0',
      fileName: '',
      working: false
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
          console.warn(err.message)
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

        wallet.generate('', this.hdPathString, (err, keystore) => {
          if (err) {
            console.warn(err.message)
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
