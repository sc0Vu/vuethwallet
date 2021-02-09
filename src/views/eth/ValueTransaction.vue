<template>
  <div class="panel">
    <h2 class="panel-heading">Value Transaction</h2>

    <div class="panel-block">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label" for="value">Wallet</label>
          </div>
        
          <div class="column is-third-quarter">
            <div class="control">
              <div class="select">
                <select v-model="walletType">
                  <option value="0">Choose Wallet</option>
                  <option value="1">Import from json</option>
                  <option value="2">Metamask</option>
                  <option value="3">Ledger</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block" v-if="isImportJSON">
      <div class="container">
        <password-input v-on:failed="failed" v-on:success="success"></password-input>
      </div>
    </div>
    
    <div class="panel-block" v-if="isImportJSON">
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

      <div class="panel-block" v-if="isHostValid">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <label class="label">Balance</label>
            </div>
            <div class="column is-three-quarter">
              <p>{{ balance }} (wei)</p>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-block" v-if="!isMetamask">
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
          <ether-units v-bind:valueLabel="'Value'" v-bind:valuePlaceholder="'Value'" v-on:success="(e) => {val = e.value * e.unit}" />
        </div>
      </div>

      <div class="panel-block">
        <div class="container">
          <ether-units v-bind:valueLabel="'Gas Price'" v-bind:valuePlaceholder="'Gas Price'" v-on:success="(e) => {gasPrice = e.value * e.unit}" />
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
        <button class="button is-primary" v-bind:disabled="working" v-on:click.prevent.self="importWallet" v-if="walletType !== '0'">
          <template v-if="isImportJSON">
            Import Wallet
          </template>
          <template v-if="!isImportJSON">
            Connect
          </template>
        </button>
        <button class="button is-info" v-on:click.prevent.self="signTransaction" v-if="address && !signedTransaction && !send && (isImportJSON || isLedger)">Sign Transaction</button>
        <button class="button is-warning" v-on:click.prevent.self="sendTransaction" v-if="address && !send && (signedTransaction || isMetamask)">Send Transaction</button>
        <button class="button is-danger" v-if="send">Transaction sending, please wait until confirm</button>
      </div>
    </div>

  </div>
</template>

<script>
import yoethwallet from 'yoethwallet'
import Message from '@/components/Message'
import { ethers } from 'ethers'
import config from '@/config'
import confirmedTransaction from '@/util/confirmedTransaction'
import { mapActions } from 'vuex'
import PasswordInput from '@/components/PasswordInput'
import EtherUnits from '@/components/EtherUnits'
import detectEthereumProvider from '@metamask/detect-provider'
import { BigNumber } from 'bignumber.js'
import LedgerTransportWebUSB from '@ledgerhq/hw-transport-webusb'
import LedgerEtherApp from '@ledgerhq/hw-app-eth'

export default {
  name: 'value-transaction',
  components: {
    Message, PasswordInput, EtherUnits
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
      nonce: '0',
      chainId: '',
      signedTransaction: '',
      send: false,
      balance: '0',
      walletType: '0',
      metamaskProvider: null,
      path: '44\'/60\'/0\'/0/0',
      ledgerApp: null
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
    },
    isImportJSON () {
      return this.walletType === '1'
    },
    isMetamask () {
      return this.walletType === '2'
    },
    isLedger () {
      return this.walletType === '3'
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
    async getBalance () {
      if (!this.provider || !this.address) {
        return ''
      }
      let provider = this.provider
      let balance = await provider.getBalance(this.address)
      return balance
    },
    async getNonce () {
      if (!this.provider || !this.address) {
        return ''
      }
      let provider = this.provider
      let nonce = await provider.getTransactionCount(this.address)
      return nonce
    },
    async importWallet () {
      if (this.walletType === '1') {
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
      } else if (this.walletType === '2' && this.metamaskProvider === null) {
        try {
          this.working = true
          const metamaskProvider = await detectEthereumProvider()
          if (metamaskProvider === window.ethereum) {
            this.metamaskProvider = metamaskProvider
            this.chainId = await metamaskProvider.request({ method: 'eth_chainId' })
            const accounts = await metamaskProvider.request({ method: 'eth_requestAccounts' })
            this.handleAccountsChange(accounts)
            // register events
            metamaskProvider.on('chainChanged', function (chainId) {
              window.location.reload()
            })
            metamaskProvider.on('accountsChanged', this.handleAccountsChange)
            this.notify({ text: 'Wallet connect successfully!', class: 'is-info' })
          }
        } catch (err) {
          console.warn(err.message)
        } finally {
          this.working = false
        }
      } else if (this.walletType === '3') {
        try {
          this.working = true
          let transport = await LedgerTransportWebUSB.create()
          const ledgerApp = new LedgerEtherApp(transport)
          const { address } = await ledgerApp.getAddress(this.path, true)
          this.address = address
          this.ledgerApp = ledgerApp
          this.notify({ text: 'Wallet connect successfully!', class: 'is-info' })
        } catch (err) {
          if (!navigator.usb) {
            this.notify({ text: 'Please use chromium based browser!', class: 'is-danger' })
          } else {
            this.notify({ text: 'Please make sure eth app was installed and started!', class: 'is-danger' })
          }
          console.warn(err.message)
        } finally {
          this.working = false
        }
      }
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
    async signTransaction () {
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

      if (this.isImportJSON) {
        valueTx.sign(this.keystore.getPrivateKey())

        this.signedTransaction = '0x' + valueTx.serialize().toString('hex')
      } else if (this.isLedger) {
        valueTx.v = this.chainId
        const sig = await this.ledgerApp.signTransaction(this.path, valueTx.serialize().toString('hex'))
        valueTx.v = '0x' + sig.v
        valueTx.r = '0x' + sig.r
        valueTx.s = '0x' + sig.s
        this.signedTransaction = '0x' + valueTx.serialize().toString('hex')
      }
    },
    async sendTransaction () {
      if (this.isImportJSON) {
        if (!this.host) {
          this.notify({ text: 'Please enter host!', class: 'is-danger' })
          return
        }
        if (!this.signedTransaction) {
          this.notify({ text: 'Please sign transaction first!', class: 'is-danger' })
          return
        }
      }
      this.send = true

      const provider = (this.isMetamask) ? this.metamaskProvider : this.provider
      try {
        let txId = ''
        if (this.isMetamask) {
          let txParams = {
            from: this.address,
            to: this.toAddress,
            value: this.isHex(this.val) ? this.val : '0x' + (new BigNumber(this.val)).toString(16),
            gasPrice: this.isHex(this.gasPrice) ? this.gasPrice : '0x' + (new BigNumber(this.gasPrice)).toString(16),
            gas: this.isHex(this.gasLimit) ? this.gasLimit : '0x' + (new BigNumber(this.gasLimit)).toString(16)
          }
          if (this.isHex(this.data)) {
            txParams.data = this.data
          }
          txId = await this.metamaskProvider.request({ method: 'eth_sendTransaction', params: [ txParams ] })
        } else {
          txId = await provider.send('eth_sendRawTransaction', [ this.signedTransaction ])
        }
        this.result = txId
        if (!this.isImportJSON) {
          this.notify({ text: 'Transaction confirmed!', class: 'is-info' })
          return
        }
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
    async handleAccountsChange (accounts) {
      if (accounts.length === 0) {
        this.notify({ text: 'Please connect to MetaMask!', class: 'is-danger' })
      } else if (accounts[0] !== this.address) {
        this.address = accounts[0]
        this.nonce = await this.metamaskProvider.request({ method: 'eth_getTransactionCount', params: [ accounts[0] ] })
        this.balance = await this.metamaskProvider.request({ method: 'eth_getBalance', params: [ accounts[0] ] })
      }
    },
    ...mapActions([
      'notify'
    ])
  },
  watch: {
    async host (val, oval) {
      if (this.isHostValid) {
        // clean old state
        this.nonce = '0'
        this.balance = '0'
        try {
          this.provider = this.newProvider()
          this.nonce = await this.getNonce()
          let balance = await this.getBalance()
          this.balance = balance.toString(10)
        } catch (err) {
          console.warn(err.message)
        }
      }
    }
  }
}
</script>
