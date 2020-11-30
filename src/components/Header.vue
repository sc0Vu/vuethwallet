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
        <router-link class="navbar-item" to="/wallet-seed">Seed Wallet</router-link>
        <router-link class="navbar-item" to="/import-keystore">Import Wallet</router-link>
        <!-- <router-link class="navbar-item" to="/contract-transaction">Contract Transaction</router-link> -->
        <router-link class="navbar-item" to="/value-transaction">Value Transaction</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>
