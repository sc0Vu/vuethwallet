<style scope>
.navbar-start > .navbar-item.active {
  background-color: #eee
}
</style>

<template>
<div id="app" class="container">
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
        <router-link class="navbar-item" to="/wallet-seed">Seed Wallet</router-link>
        <router-link class="navbar-item" to="/import-keystore">Import Wallet</router-link>
        <router-link class="navbar-item" to="/contract-transaction">Contract Transaction</router-link>
        <router-link class="navbar-item" to="/value-transaction">Value Transaction</router-link>
      </div>
    </div>
  </nav>
  <div>
    <!-- <div class="columns">
      <div class="column">
        <div>
          <router-link class="button is-primary" to="/">Wallet</router-link>
          <router-link class="button is-info" to="/wallet-seed">Seed Wallet</router-link>
          <router-link class="button is-success" to="/import-keystore">Import Wallet</router-link>
          <router-link class="button is-warning" to="/contract-transaction">Contract Transaction</router-link>
          <router-link class="button is-primary" to="/value-transaction">Value Transaction</router-link>
        </div>
      </div>
    </div> -->
    <div class="columns">
      <div class="column">
        <div class="notification is-info">
          <p>Due to the same random seeds will create the same wallet address.</p>
          <p>Remember to keep random seed save.</p>
        </div>
      </div>
    </div>
    <transition appear>
      <router-view></router-view>
    </transition>
  </div>
</div>
</template>

<script>
export default {
  name: 'app',
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
