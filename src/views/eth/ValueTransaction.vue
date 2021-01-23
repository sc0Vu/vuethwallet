<template>
  <div class="panel">
    <h2 class="panel-heading">Value Transaction</h2>

    <div class="panel-block">
      <div class="container">
        <password-input v-on:failed="failed" v-on:success="success"></password-input>
      </div>
    </div>
    
    <div class="panel-block">
      <div class="container">
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

    <template v-if="address">
      <div class="panel-block" >
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label">Address</label>
            </div>
            <div class="column is-three-quarter">
              <p v-if="!isHostValid">{{ address }}</p>
              <p v-if="isHostValid"><a v-bind:href="`${this.explorer}/address/${this.address}`" target="_blank">{{ address }}</a></p>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-block">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label" for="host">Host</label>
            </div>
          
            <div class="column is-half">
              <div class="control">
                <input id="host" class="input" type="text" v-model="host" placeholder="Host" v-bind:class="{'is-danger': (!isHostValid && host), 'is-success': isHostValid}" v-on:change="resetProvider">
                <p class="help is-danger" v-if="!isHostValid && host">Host isn't valid</p>
                <p class="help is-success" v-if="isHostValid">Host is valid</p>
              </div>
            </div>

            <div class="column is-one-quarter">
              <div class="select is-info">
                <select v-on:change="selectHost">
                  <option value="">------</option>
                  <option v-for="(host, key) in hosts" v-bind:value="key">
                    {{ `${key} ${(host.test === true) ? 'test network' : 'network'}` }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-block">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label" for="contractAddress">To Address</label>
            </div>
          
            <div class="column is-third-quarter">
              <div class="control">
                <input id="toAddress" class="input" type="text" v-model="toAddress" placeholder="To Address" v-bind:class="{'is-danger': (!isToAddressValid && toAddress), 'is-success': isToAddressValid}">
                <p class="help is-danger" v-if="!isToAddressValid && toAddress">To Address isn't valid</p>
                <p class="help is-success" v-if="isToAddressValid && toAddress">To Address is valid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-block">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label" for="value">Value</label>
            </div>
          
            <div class="column is-third-quarter">
              <div class="control">
                <input id="value" class="input" type="text" v-model="val" placeholder="Value" v-bind:class="{'is-success': val}">
                <p class="help is-success" v-if="val">Value is valid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-block">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label" for="gas-price">Gas Price</label>
            </div>
          
            <div class="column is-third-quarter">
              <div class="control">
                <input id="gas-price" class="input" type="text" v-model="gasPrice" placeholder="Gas Price" v-bind:class="{'is-success': gasPrice}">
                <p class="help is-success" v-if="gasPrice">Gas price is valid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-block">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label" for="gas-limit">Gas Limit</label>
            </div>
          
            <div class="column is-third-quarter">
              <div class="control">
                <input id="gas-limit" class="input" type="text" v-model="gasLimit" placeholder="Gas Limit" v-bind:class="{'is-success': gasLimit}">
                <p class="help is-success" v-if="gasLimit">Gas limit is valid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--div class="panel-block">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label" for="gas">Gas</label>
            </div>
          
            <div class="column is-third-quarter">
              <div class="control">
                <input id="gas" class="input" type="text" v-model="gas" placeholder="Gas" v-bind:class="{'is-success': gas}">
                <p class="help is-success" v-if="gas">Gas is valid</p>
              </div>
            </div>
          </div>
        </div>
      </div-->

      <div class="panel-block">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label" for="data">Data</label>
            </div>
          
            <div class="column is-third-quarter">
              <div class="control">
                <input id="data" class="input" type="text" v-model="data" placeholder="Data" v-bind:class="{'is-success': isHex(data)}">
                <p class="help is-success" v-if="isHex(data)">Data is valid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-block">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label" for="nonce">Nonce</label>
            </div>
          
            <div class="column is-third-quarter">
              <div class="control">
                <input id="nonce" class="input" type="text" v-model="nonce" placeholder="Nonce" disabled>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-block">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label" for="chainid">Chain Id</label>
            </div>
          
            <div class="column is-third-quarter">
              <div class="control">
                <input id="chainid" class="input" type="text" v-model="chainId" placeholder="Chain Id" disabled>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-block" v-if="result">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label" for="value">Result</label>
            </div>
          
            <div class="column is-third-quarter">
              <div class="control">
                <p><a v-bind:href="`${this.explorer}/tx/${this.result}`" target="_blank">{{ result }}</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="panel-block has-text-centered">
      <div class="container">
        <button class="button is-primary" v-bind:disabled="working" v-on:click.prevent.self="importWallet">Import Wallet</button>
        <button class="button is-info" v-on:click.prevent.self="signTransaction" v-if="address && !signedTransaction && !send">Sign Transaction</button>
        <button class="button is-warning" v-on:click.prevent.self="sendTransaction" v-if="address && signedTransaction && !send">Send Transaction</button>
        <button class="button is-danger" v-if="send">Transaction sending, please wait until confirm</button>
      </div>
    </div>

  </div>
</template>

<script>
import yoethwallet from 'yoethwallet'
import Message from '@/components/Message'
import PasswordInput from '@/components/PasswordInput'
import { ethers } from 'ethers'
import config from '@/config'
import confirmedTransaction from '@/util/confirmedTransaction'
import { mapActions } from 'vuex'

export default {
  name: 'value-transaction',
  components: {
    Message, PasswordInput
  },
  data () {
    return {
      working: false,
      password: '',
      type: 'text',
      buttonText: 'Hide',
      score: 0,
      keystore: {},
      address: '',
      keystoreJson: '',
      host: '',
      explorer: '',
      toAddress: '',
      val: '',
      gasPrice: '',
      gasLimit: '',
      gas: '',
      data: '',
      result: '',
      provider: {},
      hosts: {},
      nonce: '',
      chainId: '',
      signedTransaction: '',
      send: false
    }
  },
  created () {
    this.hosts = config.hosts || {}
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
    },
    isHostValid () {
      if (!this.host) {
        return false
      }
      return /https?:\/\/([\w.]+):?([\d]+)?/.test(this.host)
    },
    isToAddressValid () {
      if (!this.toAddress) {
        return false
      }
      return /0x[a-zA-Z0-9]{40}/.test(this.toAddress)
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
    async getNonce () {
      let provider = this.provider
      let nonce = await provider.getTransactionCount(this.address)
      return nonce
    },
    importWallet () {
      if (!this.isKeystoreJsonValid) {
        this.notify({ text: 'Please check out keystore.json!', class: 'is-danger' })
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
        this.notify({ text: 'Please choose valid keystore json!', class: 'is-danger' })
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
    newProvider () {
      let provider = new ethers.providers.JsonRpcProvider(this.host)
      return provider
    },
    signTransaction () {
      if (!this.host) {
        this.notify({ text: 'Please enter host!', class: 'is-danger' })
        return
      }
      if (!this.toAddress) {
        this.notify({ text: 'Please enter to address!', class: 'is-danger' })
        return
      }

      let txParams = {
        from: this.address,
        to: this.toAddress,
        chainId: this.chainId,
        nonce: this.nonce,
        value: this.isHex(this.val) ? this.val : parseInt(this.val),
        // gas: this.isHex(this.gas) ? this.gas : parseInt(this.gas),
        gasPrice: this.isHex(this.gasPrice) ? this.gasPrice : parseInt(this.gasPrice),
        gasLimit: this.isHex(this.gasLimit) ? this.gasLimit : parseInt(this.gasLimit)
      }
      if (this.isHex(this.data)) {
        txParams.data = this.data
      }
      let valueTx = yoethwallet.tx.valueTx(txParams)

      valueTx.sign(this.keystore.getPrivateKey())

      this.signedTransaction = '0x' + valueTx.serialize().toString('hex')
    },
    async sendTransaction () {
      if (!this.host) {
        this.notify({ text: 'Please enter host!', class: 'is-danger' })
        return
      }
      if (!this.signedTransaction) {
        this.notify({ text: 'Please sign transaction first!', class: 'is-danger' })
        return
      }
      this.send = true

      const provider = this.provider
      try {
        let txId = await provider.send('eth_sendRawTransaction', [ this.signedTransaction ])
        this.result = txId
        confirmedTransaction(provider, txId, 1, function (err, tx) {
          this.send = false
          this.signedTransaction = ''

          if (err) {
            this.notify({ text: 'Please send transaction again!', class: 'is-danger' })
            console.warn(err.message)
            return
          }
          this.notify({ text: 'Transaction confirmed!', class: 'is-info' })
        }.bind(this))
      } catch (err) {
        this.send = false
        this.signedTransaction = ''
        this.notify({ text: 'Please sign transaction again!', class: 'is-danger' })
        console.warn(err.message)
      }
    },
    resetProvider () {
      if (this.provider) {
        this.provider = {}
      }
    },
    selectHost (e) {
      let host = config.hosts[e.target.value]

      this.host = host.rpcUri
      this.explorer = host.explorerUri
      this.chainId = host.chainId
    },
    isHex (s) {
      if (typeof s !== 'string') {
        return false
      }
      return /^0x[0-9a-f]+/.test(s.toLowerCase())
    },
    ...mapActions([
      'notify'
    ])
  },
  watch: {
    async host (val, oval) {
      if (this.isHostValid) {
        try {
          this.provider = this.newProvider()
          this.nonce = await this.getNonce()
        } catch (err) {
          console.warn(err.message)
        }
      }
    }
  }
}
</script>
