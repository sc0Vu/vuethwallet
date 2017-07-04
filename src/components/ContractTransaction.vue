<template>
  <div class="panel">
    <h2 class="panel-heading">Contract Transaction</h2>

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
    <div class="panel-block has-text-centered" >
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
        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label" for="host">Host</label>
          </div>
        
          <div class="column is-third-quarter">
            <div class="control">
              <input id="host" class="input" type="text" v-model="host" placeholder="Host" v-bind:class="{'is-danger': (!isHostValid && host), 'is-success': isHostValid}" v-on:change="resetWeb3">
              <p class="help is-danger" v-if="!isHostValid && host">Host isn't valid</p>
              <p class="help is-success" v-if="isHostValid">Host is valid</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block has-text-centered">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label" for="contractAddress">Contract Address</label>
          </div>
        
          <div class="column is-third-quarter">
            <div class="control">
              <input id="contractAddress" class="input" type="text" v-model="contractAddress" placeholder="Contract Address" v-bind:class="{'is-danger': (!isContractAddressValid && contractAddress), 'is-success': isContractAddressValid}">
              <p class="help is-danger" v-if="!isContractAddressValid && contractAddress">Contract Address isn't valid</p>
              <p class="help is-success" v-if="contractAddress">Contract Address is valid</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block has-text-centered">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label" for="contractABI">Contract ABI</label>
          </div>
        
          <div class="column is-third-quarter">
            <div class="control">
              <input id="contractABI" class="input" type="text" v-model="abi" placeholder="Contract ABI" v-bind:class="{'is-danger': (!isAbiValid && abi), 'is-success': isAbiValid}">
              <p class="help is-danger" v-if="!isAbiValid && abi">Contract Abi isn't valid</p>
              <p class="help is-success" v-if="isAbiValid">Contract ABI is valid</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block has-text-centered">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label" for="name">Function Name</label>
          </div>
        
          <div class="column is-third-quarter">
            <div class="control">
              <input id="name" class="input" type="text" v-model="name" placeholder="Function Name" v-bind:class="{'is-success': name}">
              <p class="help is-success" v-if="name">Function Name is valid</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block has-text-centered">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label" for="args">Function Args</label>
          </div>
        
          <div class="column is-third-quarter">
            <div class="control">
              <input id="args" class="input" type="text" v-model="args" placeholder="Function Args" v-bind:class="{'is-success': args}">
              <p class="help is-success" v-if="args">Function Args is valid</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block has-text-centered">
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
    
    <div class="panel-block has-text-centered">
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label">Estimated Gas</label>
          </div>
        
          <div class="column is-third-quarter">
            <div class="control">
              <p class="is-success">{{ estimatedGas }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block has-text-centered" v-if="result">
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
        <button class="button is-info" v-on:click.prevent.self="contractTransaction" v-if="address">Contract Transaction</button>
      </div>
    </div>

  </div>
</template>

<script>
import zxcvbn from 'zxcvbn'
import lightwallet from 'eth-lightwallet'
import Message from '@/components/Message'
import Web3 from 'web3'

export default {
  name: 'contract-transaction',
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
      keystoreJson: '',
      host: '',
      contractAddress: '',
      abi: '',
      name: '',
      args: '',
      val: '',
      estimatedGas: 0,
      contract: {},
      pwDerivedKey: [],
      result: '',
      web3: {}
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
    },
    isHostValid () {
      if (!this.host) {
        return false
      }
      return /https?:\/\/([\w.]+):?([\d]+)?/.test(this.host)
    },
    isContractAddressValid () {
      if (!this.contractAddress) {
        return false
      }
      return /0x[a-zA-Z0-9]{40}/.test(this.contractAddress)
    },
    isAbiValid () {
      if (!this.abi) {
        return false
      }
      try {
        JSON.parse(this.abi)
      } catch (e) {
        return false
      }
      return true
    }
  },
  methods: {
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
        this.pwDerivedKey = pwDerivedKey
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
      // if (this.score < 3) {
      //   this.error = true
      //   this.msg = 'Password is not strong, please change!'
      //   return
      // }

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
    },
    createWeb3 () {
      var web3 = new Web3()
      var provider = new web3.providers.HttpProvider(this.host)

      web3.setProvider(provider)
      return web3
    },
    contractTransaction () {
      if (!this.host) {
        this.error = true
        this.msg = 'Please enter host'
        return
      }
      if (!this.contractAddress) {
        this.error = true
        this.msg = 'Please enter contract address'
        return
      }
      if (!this.abi) {
        this.error = true
        this.msg = 'Please enter contract abi'
        return
      }
      var web3

      if (!this.web3.eth) {
        web3 = this.createWeb3()
        this.web3 = web3
      } else {
        web3 = this.web3
      }
      // if (!web3.currentProvider) {
      // }
      var contract
      var abi = JSON.parse(this.abi)

      if (!this.contract.abi) {
        contract = web3.eth.contract(abi).at(this.contractAddress)
        this.contract = contract
      } else {
        contract = this.contract
      }

      var contractData = contract[this.name].getData()

      var estimatedGas = web3.eth.estimateGas({ from: this.address, data: contractData })
      // var gasLimit = estimatedGas * 1.2

      this.estimatedGas = estimatedGas

      web3.eth.getTransactionCount(this.address, function (err, nonce) {
        if (err) {
          throw err
        }
        var funcTx = lightwallet.txutils.functionTx(abi, this.name, this.args, {to: this.contractAddress, gasLimit: estimatedGas, gasPrice: estimatedGas, gas: estimatedGas, nonce: nonce, value: this.val})
        var signedTx = lightwallet.signing.signTx(this.keystore, this.pwDerivedKey, funcTx, this.keystore.getAddresses()[0])

        web3.eth.sendRawTransaction(signedTx.toString('hex'), function (err, txId) {
          if (err) {
            throw err
          }
          this.result = txId
        }.bind(this))
      }.bind(this))
    },
    resetWeb3 () {
      if (this.web3.eth) {
        this.web3 = {}
      }
    }
  }
}
</script>
