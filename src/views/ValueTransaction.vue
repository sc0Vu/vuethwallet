<template>
  <div class="panel">
    <h2 class="panel-heading">Value Transaction</h2>

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
              <p class="help is-danger" v-if="!isKeystoreJsonValid && keystoreJson">Keystore JSON isn't valid</p>
              <p class="help is-success" v-if="isKeystoreJsonValid">Keystore JSON is valid</p>
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
              <p>Address</p>
            </div>
            <div class="column is-three-quarter">
              <p>{{ address }}</p>
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
                <input id="host" class="input" type="text" v-model="host" placeholder="Host" v-bind:class="{'is-danger': (!isHostValid && host), 'is-success': isHostValid}" v-on:change="resetWeb3">
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
                <p class="help is-success" v-if="toAddress">To Address is valid</p>
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

      <div class="panel-block">
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
      </div>

      <div class="panel-block">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label" for="nonce">Nonce</label>
            </div>
          
            <div class="column is-third-quarter">
              <div class="control">
                <input id="nonce" class="input" type="text" v-model="nonce" placeholder="Nonce" v-bind:class="{'is-success': nonce}">
                <p class="help is-success" v-if="nonce">Nonce is valid</p>
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
                <input id="chainid" class="input" type="text" v-model="chainId" placeholder="Chain Id" v-bind:class="{'is-success': chainId}">
                <p class="help is-success" v-if="chainId">Chain id is valid</p>
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
                <p>{{ result }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="panel-block has-text-centered">
      <div class="container">
        <button class="button is-primary" v-on:click.prevent.self="importWallet">Import Wallet</button>
        <button class="button is-info" v-on:click.prevent.self="valueTransaction" v-if="address">Value Transaction</button>
      </div>
    </div>

  </div>
</template>

<script>
import yoethwallet from 'yoethwallet'
import Message from '@/components/Message'
import PasswordInput from '@/components/PasswordInput'
import Web3 from 'web3'
import config from '@/config'
import confirmedTransaction from '@/util/confirmedTransaction'

export default {
  name: 'value-transaction',
  components: {
    Message, PasswordInput
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
      keystoreJson: '',
      host: '',
      toAddress: '',
      val: '',
      gasPrice: '',
      gasLimit: '',
      gas: '',
      pwDerivedKey: [],
      result: '',
      web3: {},
      hosts: {},
      nonce: '',
      chainId: ''
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
    getNonce () {
      if (!this.web3.eth) {
        this.error = true
        this.msg = 'Please check out host!'
        return
      }
      let web3 = this.web3

      web3.eth.getTransactionCount(this.address, function (err, nonce) {
        if (err) {
          console.warn(err.message)
          return
        }
        this.nonce = nonce
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

      yoethwallet.wallet.fromV3String(this.keystoreJson, this.password, (err, keystore) => {
        if (err) {
          this.error = true
          this.msg = 'Please enter valid keystore json'
          console.warn(err.message)
          return
        }
        let wallet = keystore

        this.keystore = wallet
        this.address = wallet.getHexAddress(true)
        this.error = false
        this.msg = 'Wallet import successfully!'
      })
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
    },
    createWeb3 () {
      let web3 = new Web3()
      let provider = new Web3.providers.HttpProvider(this.host)

      if (!provider.isConnected()) {
        throw new Error('Please check the host or your interenet!')
      }

      web3.setProvider(provider)
      return web3
    },
    newProvider () {
      let provider = new Web3.providers.HttpProvider(this.host)

      if (!provider.isConnected()) {
        throw new Error('Please check the host or your interenet!')
      }

      this.web3.setProvider(provider)
    },
    valueTransaction () {
      if (!this.host) {
        this.error = true
        this.msg = 'Please enter host'
        return
      }
      if (!this.toAddress) {
        this.error = true
        this.msg = 'Please enter to address'
        return
      }

      let web3 = this.web3
      let valueTx = yoethwallet.tx.valueTx({from: this.address, to: this.toAddress, value: this.val, nonce: this.nonce, gas: this.gas, gasPrice: this.gasPrice, gasLimit: this.gasLimit, chainId: this.chainId})

      valueTx.sign(this.keystore.getPrivateKey())

      web3.eth.sendRawTransaction('0x' + valueTx.serialize().toString('hex'), function (err, txId) {
        if (err) {
          throw err
        }
        this.result = txId

        confirmedTransaction(web3, txId, function (err, tx) {
          if (err) {
            this.error = true
            this.msg = 'Please send transaction again'
            console.warn(err.message)
            return
          }
          console.log('Transaction confirmed')
        })
      }.bind(this))
    },
    resetWeb3 () {
      if (this.web3.eth) {
        this.web3 = {}
      }
    },
    selectHost (e) {
      let host = config.hosts[e.target.value]

      this.host = host.rpcUri
      this.chainId = host.chainId
    }
  },
  watch: {
    host (val, oval) {
      if (this.isHostValid) {
        try {
          if (val !== oval && !this.web3.eth) {
            this.web3 = this.createWeb3()
          } else {
            this.newProvider()
          }
          this.getNonce()
        } catch (err) {
          console.warn(err.message)
        }
      }
    }
  }
}
</script>
