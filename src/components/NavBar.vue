<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">Vuethwallet</router-link>

      <div class="navbar-burger burger" v-on:click.prevent="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" v-bind:class="{'is-active': isMenuActive}">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">

          <router-link class="navbar-link" to="#">Ethereum</router-link>

          <div class="navbar-dropdown">
            <router-link class="navbar-item" to="/eth">Create Wallet</router-link>
            <router-link class="navbar-item" to="/eth/wallet-seed">Recover Wallet from Mnemonic</router-link>
            <router-link class="navbar-item" to="/eth/import-keystore">Recover Wallet from Keystore</router-link>
            <!-- <router-link class="navbar-item" to="/eth/contract-transaction">Contract Transaction</router-link> -->
            <router-link class="navbar-item" to="/eth/ether-transaction">Ether Transaction</router-link>
          </div>
        </div>
        <a class="navbar-item" href="https://github.com/sc0Vu/vuethwallet">
          <span class="icon">
            <i class="fab fa-github"></i>
          </span>
          <span>
            Github
          </span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      isMenuActive: false
    }
  },
  methods: {
    toggleMenu () {
      if (this.isMenuActive) {
        this.isMenuActive = false
      } else {
        this.isMenuActive = true
      }
    }
  }
}
</script>
